const pool = require('./db');

(async () => {
    try {
        const [schedules] = await pool.query('SELECT * FROM schedules WHERE doctor_id = 4');
        console.log('Schedules for Doctor 4:', JSON.stringify(schedules, null, 2));

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
