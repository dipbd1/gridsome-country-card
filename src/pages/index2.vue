<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List of posts from Experiment folder -->
    <!-- <div>
      <PostCard v-for="edge in $page.experiments.edges" :key="edge.node.id" :post="edge.node" />
    </div> -->

    <!-- List posts -->
    <!-- <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </div> -->

    <!-- Grabing Data after mounting the page -->
    <b-container class="bv-example-row" style="">
      <b-row class="grid-container">
        <b-col>
          <div>
            <b-card
              title="Countries"
              sub-title="Card Containing Country Details"
              class="mb-4 mb-2"
              style="height:400px; max-width:300px"
            >
              <b-card-text>
                A Simple demonstration of grabing data from a
                <em>GraphQL</em> end point, and using them to produce cards containing data of
                countries.
              </b-card-text>

              <b-card-text>Its Nothing Special, Just a demo</b-card-text>

              <!-- <a href="#" class="card-link">Card link</a>
							<b-link href="#" class="card-link"
								>Another link</b-link
							> -->
            </b-card>
          </div>
        </b-col>
        <template v-for="_country in countries">
          <b-col :key="_country.emoji">
            <div>
              <b-card
                :sub-title="_country.continent.name"
                class="mb-4 mb-2"
                style="height:400px; max-width:300px;"
              >
                <b-card-title>
                  <h4>
                    {{ _country.name }}
                  </h4>
                </b-card-title>
                <b-card-text style="color:grey"> Emoji: {{ _country.emoji }} </b-card-text>
                <b-card-text>
                  Languages:
                  {{ languages(_country.languages) }}
                </b-card-text>
                <b-card-text>
                  Currency:
                  {{ _country.currency }}
                </b-card-text>
                <b-card-text>
                  Capital:
                  {{ _country.capital }}
                </b-card-text>

                <!-- <a href="#" class="card-link">Card link</a>
							<b-link href="#" class="card-link"
								>Another link</b-link
							> -->
              </b-card>
            </div></b-col
          >
        </template>

        <!-- Here we can place other cards -->
      </b-row>
    </b-container>
  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
          id
          title
          path
        }
      }
    }
  }

	countries:allCountries{
		edges{
			node{
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
		}
	}

	experiments: allExperiment{
    edges{
			node{
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        path
        
      }
    }
  }

}
</page-query>

<script>
import { GraphQLClient, gql } from "graphql-request";

import Author from "~/components/Author.vue";
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    Author,
    PostCard,
  },
  metaInfo: {
    title: "Welcome",
  },
  data() {
    return {
      countries: [],
    };
  },
  async mounted() {
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
    const countries = await client.request(query);
    this.countries = countries.countries;
    console.log(countries);
    console.log(this.countries);
  },
  methods: {
    languages(_languages) {
      let languages_text = "";
      _languages.forEach((l) => {
        languages_text = languages_text + ", " + l.name;
      });
      return languages_text.substring(2).trim();
    },
  },
};
</script>

<style scopped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
</style>
