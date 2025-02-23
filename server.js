var express = require("express");
var db = require('./db-connections');
var app = express();
app.use(express.json());
// Serve static files from the public folder (e.g., HTML, CSS, images)
app.use(express.static("./public"));

// Test endpoints
app.route('/testjson').get(function (req, res) {
    res.json({ message: 'Welcome to my server' });
});

app.route('/testtext').get(function (req, res) {
    res.send("This message is not a JSON");
});

// Item endpoints
app.route("/item").get(function (req, res) {
    var sql = "SELECT * FROM VENDING_MACHINE.ITEM";
    db.query(sql, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/item/:id").get(function (req, res) {
    var sql = "SELECT * FROM VENDING_MACHINE.ITEM WHERE item_id = ?";
    var parameter = [req.params.id];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/item").post(function (req, res) {
    var sql = "INSERT INTO VENDING_MACHINE.ITEM (item_name, item_cost, item_image, availability, item_quantity) VALUES (?, ?, ?, ?, ?)";
    var parameter = [req.body.item_name, req.body.item_cost, req.body.item_image, req.body.availability, req.body.item_quantity];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/item/:id").put(function (req, res) {
    var sql = "UPDATE VENDING_MACHINE.ITEM SET item_name = ?, item_cost = ?, availability = ?, item_quantity = ?, item_image = ? WHERE item_id = ?";
    var parameter = [
        req.body.item_name,
        req.body.item_cost,
        req.body.availability,
        req.body.item_quantity,
        req.body.item_image,
        req.params.id
    ];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/item/:id").delete(function (req, res) {
    var sql = "DELETE FROM VENDING_MACHINE.ITEM WHERE item_id = ?";
    var parameter = [req.params.id];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

// Vending Machine endpoints
app.route("/vending_machine").get(function (req, res) {
    var sql = "SELECT * FROM VENDING_MACHINE.VENDING_MACHINE";
    db.query(sql, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/vending_machine/:id").get(function (req, res) {
    var sql = "SELECT * FROM VENDING_MACHINE.VENDING_MACHINE WHERE vending_machine_id = ?";
    var parameter = [req.params.id];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/vending_machine").post(function (req, res) {
    var sql = "INSERT INTO VENDING_MACHINE.VENDING_MACHINE (location_id, vendor_name, status_id) VALUES (?, ?, ?)";
    var parameter = [req.body.location_id, req.body.vendor_name, req.body.status_id];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/vending_machine/:id").put(function (req, res) {
    var sql = "UPDATE VENDING_MACHINE.VENDING_MACHINE SET location_id = ?, vendor_name = ?, status_id = ? WHERE vending_machine_id = ?";
    var parameter = [
        req.body.location_id,
        req.body.vendor_name,
        req.body.status_id,
        req.params.id
    ];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});

app.route("/vending_machine/:id").delete(function (req, res) {
    var sql = "DELETE FROM VENDING_MACHINE.VENDING_MACHINE WHERE vending_machine_id = ?";
    var parameter = [req.params.id];
    db.query(sql, parameter, function (error, result) {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    });
});
app.route("/item").get(function (req, res) {
    var vendingMachineId = req.query.vending_machine_id;
    var sql = "SELECT * FROM ITEM WHERE vending_machine_id = ?";

    db.query(sql, [vendingMachineId], function (error, result) {
        if (error) {
            res.status(500).json({ error: "Database query failed." });
        } else {
            res.json(result);
        }
    });
});
app.get("/item", function (req, res) {
    var vendingMachineId = req.query.vending_machine_id;

    if (!vendingMachineId) {
        return res.status(400).json({ error: "Missing vending_machine_id parameter." });
    }

    var sql = `
        SELECT i.*
        FROM vending_machine.vending_item vi
        JOIN vending_machine.item i ON vi.item_id = i.item_id
        WHERE vi.vending_machine_id = ?`;

    db.query(sql, [vendingMachineId], function (error, result) {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ error: "Database query failed." });
        }
        res.json(result);
    });
});



// Start the server
app.listen(8080, "127.0.0.1");
console.log("Webserver is started on http://127.0.0.1:8080");