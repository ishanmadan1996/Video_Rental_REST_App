let server;
const req = require("supertest");
const {Genre} = require("../../models/genre");
const {User} = require("../../models/user");
const mongoose = require("mongoose");

describe('/api/genres', ()=>{
    beforeEach(()=>{
        server = require("../../index");
    })
    afterEach(async ()=>{
        await server.close();
        await Genre.remove({})
    })
    describe('GET /',()=>{
        it ("should return all genres", async ()=>{
            Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'},
                {name:'genre3'}
            ])
            const res = await req(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(g => g.name == 'genre1')).toBeTruthy
        })
    })

    describe('GET /:id', ()=>{
        it("should return a genre if valid id is passed", async ()=>{
            const genre = new Genre({name:'genre1'});
            await genre.save();

            const res = await req(server).get("/api/genres/"+genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name)
        })

        it("should return 404 if invalid id is passed", async ()=>{
            const res = await req(server).get("/api/genres/1");
            expect(res.status).toBe(404);
        })     

        it("should return 404 if no genre with the given id exists", async ()=>{
            const id = mongoose.Types.ObjectId();
            const res = await req(server).get("/api/genres/"+id);
            expect(res.status).toBe(404);
        })     
    })

    describe("POST /", ()=>{

        let token;
        let genre;
        const exec = async ()=>{
            return await req(server).post('/api/genres')
            .set('x-auth-token', token)
            .send({
                name:genre
            })
        }
        beforeEach(()=>{
            genre = 'genre1'
            token = new User().generateAuthToken();
        })
        it("should return a 401 if client is not logged in", async ()=>{
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        })

        it("should return a 400 if genre is less than 5 chars", async ()=>{
            genre = "1234"
            const res = await exec();
            expect(res.status).toBe(400);
        })

        it("should return a 400 if genre is more than 50 chars", async ()=>{
            genre = new Array(52).join('a');
            const res = await exec()
            expect(res.status).toBe(400);
        })

        it("should save the genre if it is valid", async ()=>{
            await exec()
            const genre = await Genre.find({name:'genre1'})
            expect(genre).not.toBeNull();
        })

        
        it("should return the genre in body of req if it is valid", async ()=>{
            const res = await exec()
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name','genre1');
        })
    })

    
  describe('PUT /:id', () => {
    let token; 
    let newName; 
    let genre; 
    let id; 

    const exec = async () => {
      return await req(server)
        .put('/api/genres/' + id)
        .set('x-auth-token', token)
        .send({ name: newName });
    }

    beforeEach(async () => {
      // Before each test we need to create a genre and 
      // put it in the database.      
      genre = new Genre({ name: 'genre1' });
      await genre.save();
      
      token = new User().generateAuthToken();     
      id = genre._id; 
      newName = 'updatedName'; 
    })

    it('should return 401 if client is not logged in', async () => {
      token = ''; 

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is less than 5 characters', async () => {
      newName = '1234'; 
      
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if genre is more than 50 characters', async () => {
      newName = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if genre with the given id was not found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should update the genre if input is valid', async () => {
      await exec();

      const updatedGenre = await Genre.findById(genre._id);

      expect(updatedGenre.name).toBe(newName);
    });

    it('should return the updated genre if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });  
    
})