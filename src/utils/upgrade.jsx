const upgradeData = {
    Free: {
        subHeader: 'For anyone to get started',
        price: 0,
        body: [
            'up to 500 images', 'single user', 'up to 1024x1024 resolution size', 'detection on single image', 'manual rotated and bounding box annotation', '10% manual correction'
        ]
    },
    Business: {
        subHeader: 'For solo preneurs, bootstrappers, early stage startups',
        price: 17,
        body: [
            'up to 2000 images', 'single user', 'up to 1024x1024 resolution size', 'detection on single image', 'full data automated annotation', 'video annotation(coming soon)', 'manual rotated and bounding box annotation', '10-15% manual correction'
        ]
    },
    Enterprise: {
        subHeader: 'Per image type and image number',
        price: 100,
        body: [
            'unlimited images', 'multiple users', 'up to 4096x4096 resolution size', 'detection on single image', 'full data automated annotation', 'video annotation(coming soon)', 'manual rotated and bounding box annotation', '10-15% manual correction'
        ]
    }
}

export default upgradeData;
