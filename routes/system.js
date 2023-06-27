import {adduser, checkuser, getidbyusername} from "../database.js"
export function system(app){
    
    app.post("/sign", async (req, res) => {
        const name = req.body.username;
        const password = req.body.password;
        const data = await adduser(name, password)
        res.redirect("/")
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