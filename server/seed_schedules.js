const pool = require('./db');

(async () => {
    try {
        const doctorId = 4;
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const startTime = '09:00:00';
        const endTime = '17:00:00';

        console.log(`Seeding schedules for Doctor ${doctorId}...`);

        for (const day of days) {
            // Check if schedule exists
            const [existing] = await pool.query(
                'SELECT * FROM schedules WHERE doctor_id = ? AND day_of_week = ?',
                [doctorId, day]
            );

            if (existing.length === 0) {
                await pool.query(
                    'INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)',
                    [doctorId, day, startTime, endTime]
                );
                console.log(`Added schedule for ${day}`);
            } else {
                console.log(`Schedule for ${day} already exists`);
            }
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
