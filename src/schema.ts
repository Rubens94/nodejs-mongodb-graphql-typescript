module.exports = `
    type Query {
        empresa(_id: String!): Empresa
        empresas(razon_social: String): [Empresa]
    }

    type Empresa {
        _id: String
        nombre: String
        razon_social: String
        domicilio: String
        no_domicilio: Int
        cp: Int
        ciudad: String
        estado: String 
        pais: String
        rfc: String
    }

    type Mutation {
        crearEmpresa(nombre: String!, razon_social: String!, domicilio: String, no_domicilio: Int, cp: Int, ciudad: String!, estado: String!, pais: String!, rfc: String!): Empresa
        updateEmpresa(_id: String!,nombre: String!, razon_social: String!, domicilio: String, no_domicilio: Int, cp: Int, ciudad: String!, estado: String!, pais: String!, rfc: String!): Empresa
        deleteEmpresa(_id: String!): Empresa
    }
`