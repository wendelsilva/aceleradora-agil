import { routes } from "../routes";
import { prisma } from "../prisma";

routes.get("/book/withdraw", (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;

    async function withdrawBook() {
        const book = await prisma.book.findUnique({
            where: { 
                id: bookId, 
            }
        });

        if(book?.status === "Disponível") {
            await prisma.book.update({
                where: { 
                    id: bookId,
                },
                data: {
                    status: "Indisponível",
                    userId: userId,
                }
            }).then(() => {
                res.status(200).send()
            })
        } else {
           res.status(503).send() 
        }
    }

    withdrawBook();
})

routes.post("/book/giveback", (req, res) => {
    const bookId = req.body.bookId;

    async function giveBackBook() {
        const book = await prisma.book.findUnique({
            where: { 
                id: bookId, 
            }
        });

        if(book?.status === "Indisponível") {
            await prisma.book.update({
                where: {
                    id: bookId
                },
                data: {
                    status: "Disponível",
                    userId: null,
                }
            }).then(() => {
                res.status(200).send()
            })
        } else {
            res.status(503).send() 
        }  
    }

    giveBackBook();
})

routes.post("/book/donate", (req, res) => {
    const code = req.body.code;
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;
    const status = req.body.status;

    async function donateBook() {
        const book = await prisma.book.findUnique({
            where: {
                code: code,
            }
        });

        if(book) {
            res.status(409).send()
        } else {
            await prisma.book.create({
                data: {
                    code: code,
                    title: title,
                    author: author,
                    year: year,
                    status: status,
                }
            });

            res.status(201).send()
        }
    }

    donateBook();
})

module.exports = routes;