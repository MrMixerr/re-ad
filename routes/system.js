import {adduser, checkuser, getidbyusername} from "../database.js"
export function system(app){
    
    app.post("/sign", async (req, res) => {
        const name = req.body.username;
        const password = req.body.password;
        const data = await adduser(name, password);
        if(data == 0) {
          res.send("Error: An account with this name already exists");
        } else {
          res.redirect("/");
        }
    })
    app.post("/log", async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const data = await checkuser(username, password)
    
        if (data == ""){
          res.send("something went wrong")
        }
        else {
          req.session.username = username
          req.session.loggedin = true
          for (const i of await getidbyusername(req.session.username)){            
            req.session.userid = i.id
            console.log(req.session.userid)
          }


          res.redirect("/");
        }
    })

    app.get("/logout", (req, res) => {
        req.session.username = ""
        req.session.loggedin = false
        res.redirect("/");
      })

    app.get("/signin", async (req, res) => {
        res.render("sign-up")
    })
    app.get("/login", async (req, res) => {
        res.render("login")
    })
}