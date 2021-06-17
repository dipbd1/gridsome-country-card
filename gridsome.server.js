// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.

// To restart press CTRL + C in terminal and run `gridsome develop`

const { GraphQLClient, gql } = require("graphql-request")


module.exports = function (api) {
  api.loadSource(async (actions) => {
		const client = new GraphQLClient("https://countries.trevorblades.com/");
    const query = gql`
			{
				countries {
					name
					continent {
						name
					}
					languages {
						name
						native
					}
					emoji
          currency
          capital
				}
			}
		`;

    const countries = await client.request(query)

    const collection = actions.addCollection({
      typeName: 'Countries'
    })


      collection.addNode(countries)
    // Use the Data store API here: https://gridsome.org/docs/data-store-api/
  })
}
