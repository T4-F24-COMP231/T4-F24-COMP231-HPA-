
class HealthData {
    constructor(userId, date, healthMetric, value) {
        this.userId = userId;
        this.date = date;
        this.healthMetric = healthMetric;
        this.value = value;
    }
}

module.exports = HealthData;
