const connection = require("./db/connection");


class Queries {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments() {
        return this.connection.promise().query("SELECT * FROM department")
    }
}