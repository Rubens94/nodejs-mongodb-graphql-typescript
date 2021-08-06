const { ObjectId } = require('mongodb');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const empresaSchema = require('./schema');

module.exports = (app, db) => {
    const schema = buildSchema(empresaSchema);

    const getEmpresa = async function (args) {
        try {
            return await db.db().collection('empresas').findOne({ _id: new ObjectId(args._id) });
        } catch(err) {
            console.log(err);
        }
    }


    const getEmpresas = async function (args) {
        try {
            if ( !args.razon_social ) {
                return await db.db().collection('empresas').find().toArray();
            }

            return await db.db().collection('empresas').find({ razon_social: args.razon_social }).toArray();
        } catch(err) {
            console.log(err);
        }
    }

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
        } catch(err) {
            console.log(err);
        }
    }

    const deleteEmpresa = function (args) {
        try {
            db.db().collection('empresas').deleteOne({ _id: new ObjectId(args._id) });
        } catch (err) {
            console.log(err);
        }
    }
    
    const crearEmpresa = function ({ nombre, razon_social, domicilio, no_domicilio, cp, ciudad, estado, pais, rfc }) {
        const new_empresa = { nombre, razon_social, domicilio, no_domicilio, cp, ciudad, estado, pais, rfc };

        try{
            db.db().collection('empresas').insertOne(new_empresa);
            return new_empresa;
        } catch (err) {
            console.log(err);
        }
    }
    
    const root = {
        empresa: getEmpresa,
        empresas: getEmpresas,
        updateEmpresa,
        deleteEmpresa,
        crearEmpresa
    }

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    }));

}