import { routes } from "../routes";
import { prisma } from "../prisma";

routes.get("/user/login", (req, res) => {
    const name = req.body.name;

    async function loginUser() {
        const user = await prisma.user.findUnique({
            where: {
                name: name,
            }
        })

        if(user) {
            res.send(200).send();
        } else {
            res.status(403).send();
        }
    }

    loginUser();
})

routes.post("/user/create", (req, res) => {
    const name = req.body.name;

    async function createUser() {
        const user = await prisma.user.findUnique({
            where: {
                name: name
            }
        })

        if(user) {
            res.status(409).send();
        } else {
            await prisma.user.create({
                data: {
                    name: name,
                }
            })

            res.status(201).send();
        }
    }

    createUser();
})

module.exports = routes;