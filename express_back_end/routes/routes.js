const { response } = require("express");
const express = require("express");
//const cookieSession = require("cookie-session");
const router = express.Router();

const routes = (db) => {


  router.get("/login/:username", (req, res) => {
    db.query(`select * from users where user_name='${req.params.username}'`)
      .then((response) => {

        res.send(response.rows);
      })
      .catch((err) => console.log(err));
  })


  router.get("/friendlist/:id",(req, res) => {
    db.query(`select users.user_name, users.avatar from friendship 
join users on friendship.user_id2=users.id where friendship.user_id1=${req.params.id}

union 

select users.user_name, users.avatar from friendship 
join users on friendship.user_id1=users.id where friendship.user_id2=${req.params.id}`)
    .then((response) => {
      res.send(response.rows)
    })
    .catch((err)=>console.log(err))

  })
  //GET dashboard
  router.get("/dashboard", (req, res) => {
    //select trips
    //select friends
    //weather
  });

  //GET calendar
  router.get("/calendar", (req, res) => {
    // select trips
  });

  //GET new trip
  router.get("/new", (req, res) => {
  });

  //POST save new trip
  router.post("/new", (req, res) => {
    //return primarykey
  });

  // POST new trip:
  router.post('/newTrip', (req, res) => {
    // const creator_id = req.session.user_id;
    const creator_id = req.body.creator_id;
    const title = req.body.title;
    const description = req.body.description;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const activity = req.body.activity;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    db.query(`
    INSERT INTO trips (creator_id, title, description,
      start_date, end_date, activity, longitude, latitude)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [creator_id, title, description, start_date, end_date, activity, longitude, latitude]
    ).then((data) => {
      return res.json(data.rows[0]);
    });
  });

  // POST Create a user gear list:
  router.post('/newGearList', (req, res) => {

    const trip_id = req.body.trip_id;
    const type_id = req.body.type_id;
    const checked = req.body.checked;
    db.query(`
    INSERT INTO user_checklist (trip_id,type_id, checked)
      VALUES ($1,$2, $3) RETURNING *`,
      [trip_id, type_id, checked]
    ).then((data) => {
      return res.json(data.rows[0]);
    });
  });


  // PUT, Edit the trip:
  router.put('/trips/edit/:trip_id', (req, res) => {
    const id = req.params.trip_id;
    const title = req.body.title;
    const description = req.body.desc;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const activity = req.body.activity;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    db.query(
      `
      UPDATE trips SET title=$1, description=$2,
      start_date=$3, end_date=$4,activity_category=$5,
      longitude=$6, latitude=$7
      WHERE id=$8 RETURNING *;`,
      [title, description, start_date, end_date, activity, longitude, latitude, id]
    ).then(() => {
      res.status(200).send("updated Trip");
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  // DELETE, delete the trip:
  router.delete('/trips/delete/:trip_id', (req, res) => {
    const id = req.params.trip_id;
    db.query(`
    DELETE FROM trips
    WHERE id=$1;
    `, [id]
    ).then(() => {
      res.status(200).send("Deleted Trip");
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  //Get All gear list
  router.get('/allGear', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
      gear_checklist;
    `
    ).then(({ rows: dbResponse }) => {
      // console.log("newRes:::", dbResponse);
      res.json(dbResponse)

    });
  });
  router.get('/trips/:trip_id', (req, res) => {
    const { id } = req.params;
    db.query(
      `
      SELECT
        *
      FROM
      trips;
      WHERE id = $1
    `, [id]
    ).then(({ rows: dbResponse }) => {
      // console.log("newRes:::", dbResponse);
      res.json(dbResponse);

    });
  });

  //Get gear base on Activity
  router.get('/activities/:activityName', (req, res) => {
    const { activityName } = req.params;
    db.query(
      `
      SELECT
        *
      FROM
      gear_checklist
      WHERE activity = $1
    `, [activityName]
    ).then((dbResponse) => {
      // console.log("newRes:::", dbResponse.rows);
      res.json(dbResponse.rows)

    });
  });

  // GET user gear list:
  router.get('/trip/gearList/:id', (req, res) => {
    const { id } = req.params;
    db.query(
      `
      SELECT
        *
      FROM
      user_checklist
      WHERE id = $1;
    `, [id,]
    ).then((dbResponse) => {
      console.log("newRes:::", dbResponse.rows);
      res.json(dbResponse.rows)

    });
  });


  // router.get('/gear/typeDetail/:type_id', (req, res) => {
  //   const { id } = req.params;
  //   db.query(
  //     `
  //     SELECT
  //       *
  //     FROM
  //     gear_checklist
  //     WHERE activity = $1
  //   `, [activityName]
  //   ).then((dbResponse) => {
  //     console.log("newRes:::", dbResponse.rows);
  //     res.json(dbResponse.rows)

  //   });
  // });




  //POST save user gear     
  router.post("/usergear", (req, res) => {
    //return primarykey
  });

  router.get("/activity/:activityname", (req, res) => {

    db.query(`select * from gear_checklist where activity='${req.params.activityname}';`)
      .then((response) => {
        const checklist_category = [];
        for (let activity of response.rows) {
          if (!checklist_category.includes(activity.category)) {
            checklist_category.push(activity.category)
          }
        }
        const gear_checklist = []

        for (let activity1 of checklist_category) {
          const checklist = {}
          checklist["name"] = activity1;
          checklist["children"] = [];
          for (let activity2 of response.rows) {
            if (activity1 === activity2.category) {
              checklist["children"].push({ "id": activity2.id, "name": activity2.type });
            }
          }
          gear_checklist.push(checklist);
        }
        res.send(gear_checklist);
      })
      .catch((err) => console.log(err));


  })
  return router;
}

module.exports = routes;