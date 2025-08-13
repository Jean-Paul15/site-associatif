"use client";
import { useState, useEffect, useRef } from 'react';

const CountUp = ({
    end,
    duration = 2000,
    prefix = "+",
    separator = " ",
    className = ""
}) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const elementRef = useRef(null);

    // Parse the end value to handle formatted numbers like "26 190"
    const parseNumber = (str) => {
        return parseInt(str.replace(/\s/g, ''));
    };

    // Format number with spaces for thousands
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    };

    const endValue = parseNumber(end.toString());

    // Détecter si l'utilisateur est sur mobile
    useEffect(() => {
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent;
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            const isSmallScreen = window.innerWidth <= 768;
            setIsMobile(isMobileDevice || isSmallScreen);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!isVisible) return;

        // Si mobile, afficher directement le résultat final sans animation
        if (isMobile) {
            setCount(endValue);
            return;
        }

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutCubic * endValue);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isVisible, endValue, duration, isMobile]);

    return (
        <span ref={elementRef} className={className}>
            {prefix}{formatNumber(count)}
        </span>
    );
};

export default CountUp;
