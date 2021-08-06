var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { ObjectId } = require('mongodb');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const empresaSchema = require('./schema');
module.exports = (app, db) => {
    const schema = buildSchema(empresaSchema);
    const getEmpresa = function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.db().collection('empresas').findOne({ _id: new ObjectId(args._id) });
            }
            catch (err) {
                console.log(err);
            }
        });
    };
    const getEmpresas = function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!args.razon_social) {
                    return yield db.db().collection('empresas').find().toArray();
                }
                return yield db.db().collection('empresas').find({ razon_social: args.razon_social }).toArray();
            }
            catch (err) {
                console.log(err);
            }
        });
    };
    const updateEmpresa = function (args) {
        try {
            const filter = { _id: new ObjectId(args._id) };
            let empresa_fields = {};
            Object.keys(args).forEach((arg) => {
                if (arg) {
                    if (arg != '_id') {
                        empresa_fields[arg] = args[arg];
                    }
                }
            });
            const empresa = { $set: empresa_fields };
            db.db().collection('empresas').updateOne(filter, empresa);
            return empresa_fields;
        }
        catch (err) {
            console.log(err);
        }
    };
    const deleteEmpresa = function (args) {
        try {
            db.db().collection('empresas').deleteOne({ _id: new ObjectId(args._id) });
        }
        catch (err) {
            console.log(err);
        }
    };
    const crearEmpresa = function ({ nombre, razon_social, domicilio, no_domicilio, cp, ciudad, estado, pais, rfc }) {
        const new_empresa = { nombre, razon_social, domicilio, no_domicilio, cp, ciudad, estado, pais, rfc };
        try {
            db.db().collection('empresas').insertOne(new_empresa);
            return new_empresa;
        }
        catch (err) {
            console.log(err);
        }
    };
    const root = {
        empresa: getEmpresa,
        empresas: getEmpresas,
        updateEmpresa,
        deleteEmpresa,
        crearEmpresa
    };
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));
};
//# sourceMappingURL=app.js.map