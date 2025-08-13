// test/mobile-detection-test.js
// Test simple pour vérifier la logique de détection mobile

function testMobileDetection() {
    // Simuler différents user agents
    const testCases = [
        {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
            windowWidth: 375,
            expected: true,
            description: 'iPhone'
        },
        {
            userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
            windowWidth: 412,
            expected: true,
            description: 'Android Phone'
        },
        {
            userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
            windowWidth: 768,
            expected: true,
            description: 'iPad'
        },
        {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            windowWidth: 1920,
            expected: false,
            description: 'Desktop PC'
        },
        {
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            windowWidth: 600,
            expected: true,
            description: 'Desktop with small screen'
        }
    ];

    console.log('🧪 Test de détection mobile pour CountUp');
    console.log('='.repeat(50));

    testCases.forEach((testCase, index) => {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(testCase.userAgent);
        const isSmallScreen = testCase.windowWidth <= 768;
        const isMobile = isMobileDevice || isSmallScreen;

        const result = isMobile === testCase.expected ? '✅ PASS' : '❌ FAIL';

        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`  User Agent: ${testCase.userAgent.substring(0, 60)}...`);
        console.log(`  Window Width: ${testCase.windowWidth}px`);
        console.log(`  Expected: ${testCase.expected ? 'Mobile' : 'Desktop'}`);
        console.log(`  Detected: ${isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`  Result: ${result}`);
        console.log('');
    });
}

// Exporter pour usage éventuel
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testMobileDetection;
} else {
    // Exécuter directement si dans le navigateur
    testMobileDetection();
}
