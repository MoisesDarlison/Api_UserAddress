import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import { app } from '../../app';

describe("CRUD test -> User, address and session", () => {
    beforeAll(async () => {
        await createConnection();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    describe("Route User Tests", () => {

        describe("Create - Creates a user in the database", () => {
            it("Should check if the req.body data is valid or empty", async () => {
                const response = await request(app).post("/users").send({
                    name: "A",
                    telephone: "12345678",
                    email: "A@exemple.com",
                    password: "123456",
                    age: 30,
                    ethnicity: "white"
                });
                expect(response.status).toBe(400);
            });

            it("should check if the req.body data is valid or empty and save dabase", async () => {
                const response = await request(app).post("/users").send({
                    name: "A",
                    telephone: "12345678",
                    email: "A@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "white"
                });
                expect(response.status).toBe(201);
            });

            it("should checks if the system accepts more than one user with the same email", async () => {
                const response = await request(app).post("/users").send({
                    name: "A",
                    telephone: "12345678",
                    email: "A@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "white"
                });
                expect(response.status).toBe(401);
            });
        });

        describe("Autheticate", () => {
            it("Should NOT authenticate with invalid credentials", async () => {
                const response = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123123"
                });
                expect(response.status).toBe(401);
            });

            it("Should authenticate with valid credentials", async () => {
                const response = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123456"
                });

                expect(response.body).toHaveProperty("token");
                expect(response.status).toBe(200);
            });
        });

        describe("Index - Lists all users", () => {
            it("Should must list all users if they have a valid token", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123456"
                });

                const response = await request(app).get('/users/list').
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(200);
            });

            it("Should must NOT list the users if the token is invalid", async () => {

                const response = await request(app).get('/users/list').
                    set('authorization', `Bearer 123456`);

                expect(response.status).toBe(401)
            });
        });

        describe("Filter - List specific users found by a valid token", () => {
            it(" Should list specific users found by a valid token ", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123456"
                });

                const response = await request(app).get(`/users/`).
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.body.user).toHaveProperty('id');
                expect(response.status).toBe(200);
            });

            it("Should NOT list specific users if token is invalid ", async () => {

                const response = await request(app).get(`/users/`).
                    set('authorization', `Bearer 123456789`);

                expect(response.status).toBe(401);
            })
        });

        describe("Updade - Update information user", () => {
            it("Should check if the req.body data is valid or empty", async () => {
                const response = await request(app).post("/users").send({
                    name: "B",
                    email: "A@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "black"
                });
                expect(response.status).toBe(400);
            });

            it("Should modify user data if is valid token", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123456"
                });

                const response = await request(app).put(`/users/`).
                    set('authorization', `Bearer ${getToken.body.token}`).send({
                        name: "B",
                        telephone: "12345678",
                        email: "A@exemple.com",
                        password: "123456",
                        age: 30,
                        weight: 60.12,
                        ethnicity: "black"
                    });
                expect(response.body).toHaveProperty('id')
                expect(response.status).toBe(200);
            });

            it("Should NOT modify user data if invalid token", async () => {

                const response = await request(app).put(`/users/`).
                    set('authorization', `Bearer 123456789`).send({
                        name: "B",
                        telephone: "12345678",
                        email: "A@exemple.com",
                        password: "123456",
                        age: 30,
                        weight: 60.12,
                        ethnicity: "black"
                    });

                expect(response.status).toBe(401);
            });

            it("should NOT authorize changing email to an already registered email", async () => {

                const newUser = await request(app).post("/users").send({
                    name: "B",
                    telephone: "12345678",
                    email: "A@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "black"
                });

                const getToken = await request(app).post("/auth").send({
                    email: "B@exemple.com",
                    password: "123456"
                });

                const response = await request(app).put(`/users/`).
                    set('authorization', `Bearer ${getToken.body.token}`).send({
                        name: "B",
                        telephone: "12345678",
                        email: "A@exemple.com",
                        password: "123456",
                        age: 30,
                        weight: 60.12,
                        ethnicity: "black"
                    });

                expect(response.status).toBe(401);
            });
        });

        describe("Destroy - Delete data user", () => {
            it("Should deletes the data of the user who owns the valid token", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "A@exemple.com",
                    password: "123456"
                });

                const response = await request(app).delete(`/users/`).
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(204);
            });

            it("Should NOT Deletes the data of the user if invalid token", async () => {

                const response = await request(app).delete(`/users/`).
                    set('authorization', `Bearer 123456789`);

                expect(response.status).toBe(401);
            });
        });
    });

    describe("Route Auth/Session Tests", () => {

        describe("Autheticate", () => {
            it("Should NOT authenticate with invalid credentials", async () => {
                await request(app).post("/users").send({
                    name: "C",
                    telephone: "12345678",
                    email: "C@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "white"
                });

                const response = await request(app).post("/auth").send({
                    email: "C@exemple.com",
                    password: "123123"
                });
                expect(response.status).toBe(401);
            });

            it("Should authenticate with valid credentials", async () => {
                const response = await request(app).post("/auth").send({
                    email: "C@exemple.com",
                    password: "123456"
                });

                expect(response.body).toHaveProperty("token");
                expect(response.status).toBe(200);
            });
        });
    });

    describe("Route Address Tests", () => {

        describe("Create - create a address", () => {
            it("Should create address if token its valid", async () => {

                await request(app).post("/users").send({
                    name: "D",
                    telephone: "12345678",
                    email: "D@exemple.com",
                    password: "123456",
                    age: 30,
                    weight: 60.12,
                    ethnicity: "white"
                });

                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).post("/address").send({
                    addressName: "Rua B",
                    addressNumber: "10a",
                    complement: "",
                    zipcode: "59890000",
                    city: "frututo",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.body).toHaveProperty('id');
                expect(response.status).toBe(201);
            });

            it("Should NOT create address if token its invalid", async () => {

                const response = await request(app).post("/address").send({
                    addressName: "Rua B",
                    addressNumber: "10a",
                    complement: "",
                    zipcode: "59890000",
                    city: "frututo",
                    state: "RN"
                }).set('authorization', `Bearer 123456456`);

                expect(response.status).toBe(401);
            });

            it("Should NOT create address if not validate data of req.body ", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).post("/address").send({
                    addressName: "Rua B",
                    addressNumber: "10a",
                    city: "frututo",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(400);
            });
        });

        describe("Index - Lists all user addresses ", () => {

            it("Should lists all user addresses if token is valid", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).get('/address/list').
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(200);
            });

            it("Should NOT lists all user addresses if token its invalid", async () => {

                const response = await request(app).get('/users/list').
                    set('authorization', `Bearer 123456`);

                expect(response.status).toBe(401);
            });
        });

        describe("Filter - Lista Endereco especifico pelo seu ID", () => {
            it("Should lists the specific address by its ID in req.params.id ", async () => {

                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const getAddress = await request(app).post("/address").send({
                    addressName: "Rua B",
                    addressNumber: "10a",
                    complement: "",
                    zipcode: "59890000",
                    city: "frututo",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);


                const response = await request(app).get(`/address/${getAddress.body.id}`).
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(getAddress.body).toHaveProperty('id');
                expect(response.status).toBe(200);
            });

            it("Should NOT lists the specific address if invalid token", async () => {

                const response = await request(app).get(`/users/`).
                    set('authorization', `Bearer 123456789`);

                expect(response.status).toBe(401);
            });

            it("Should NOT lists the specific address by its ID in req.params.id if ID its invalid ", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).get(`/users/123`).
                    set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(404);
            });
        });

        describe("Updade - Update Address", () => {
            it("Shoult NOT update data if invalid validation req.body", async () => {

                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).post("/address").send({
                    addressName: "Rua B",
                    addressNumber: "10a",
                    complement: "",
                    zipcode: "59890000",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(400);
            });

            it("Should update address if valid token", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const getIdAddress = await request(app).post("/address").send({
                    addressName: "Rua C",
                    addressNumber: "10E",
                    complement: "Bloco F",
                    zipcode: "59890000",
                    city: "Mossoró",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);


                const response = await request(app).put(`/address/${getIdAddress.body.id}`).send({
                    addressName: "Rua H",
                    addressNumber: "201",
                    complement: "",
                    zipcode: 59640272,
                    city: "Mossoró",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);

                expect(getToken.body).toHaveProperty('token');
                expect(getIdAddress.body).toHaveProperty('id');
                expect(response.status).toBe(201);
            });

            it("Should NOT update address if invalid token", async () => {
                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const getIdAddress = await request(app).post("/address").send({
                    addressName: "Rua C",
                    addressNumber: "10E",
                    complement: "Bloco F",
                    zipcode: "59890000",
                    city: "Mossoró",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);


                const response = await request(app).put(`/address/${getIdAddress.body.id}`).send({
                    addressName: "Rua H",
                    addressNumber: "201",
                    complement: "",
                    zipcode: 59640272,
                    city: "Mossoró",
                    state: "RN"
                }).set('authorization', `Bearer 123456789`);

                expect(response.status).toBe(401);
            });

            it("Should NOT update address if params.id its invalid", async () => {

                const getToken = await request(app).post("/auth").send({
                    email: "D@exemple.com",
                    password: "123456"
                });

                const response = await request(app).put(`/address/123456789`).send({
                    addressName: "Rua H",
                    addressNumber: "201",
                    complement: "",
                    zipcode: 59640272,
                    city: "Mossoró",
                    state: "RN"
                }).set('authorization', `Bearer ${getToken.body.token}`);

                expect(response.status).toBe(401);
            });
        });
    });
});