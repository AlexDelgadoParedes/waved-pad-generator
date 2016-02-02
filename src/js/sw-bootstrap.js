function registerServiceWorker() {

    if (!navigator.serviceWorker) {
        return;
    }

    function trackInstalling(worker) {
        console.log('Service Worker: installing...');
        worker.addEventListener('statechange', function() {
            if (worker.state === 'installed') {
                onInstalled();
            } else if (worker.state === 'activated') {
                console.log('Service Worker: activated');
            }
        });
    }

    function onInstalled() {
        console.log('Service Worker: installed');
    }

    navigator.serviceWorker.register('sw.js', {
        scope: './'
    }).then(function(reg) {
        console.log('Service Worker: registered');

        if (!navigator.serviceWorker.controller) {
            return;
        }

        if (reg.waiting) {
            onInstalled();
            return;
        }

        if (reg.installing) {
            trackInstalling(reg.installing);
            return;
        }

        reg.addEventListener('updatefound', function() {
            trackInstalling(reg.installing);
        });

    }).catch(function(err) {
        console.log('Service Worker: registration failed ', err);
    });
}

export default registerServiceWorker;