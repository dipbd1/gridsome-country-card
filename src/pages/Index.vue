<template>
	<Layout :show-logo="false">
		<!-- Author intro -->
		<Author :show-title="true" />

		<!-- List posts -->
		<div class="posts">
			<PostCard
				v-for="edge in $page.posts.edges"
				:key="edge.node.id"
				:post="edge.node"
			/>
		</div>
		<b-container class="bv-example-row" style="">
			<b-row class="grid-container">
				<b-col class="grid-item">
					<div>
						<b-card
							title="Countries"
							sub-title="Card Containing Country Details"
							class="mb-2"
							style="height:400px; max-width:300px"
						>
							<b-card-text>
								A Simple demonstration of grabing data from a
								<em>GraphQL</em> end point, and using them to produce cards
								containing data of countries.
							</b-card-text>

							<b-card-text>Its Nothing Special, Just a demo</b-card-text>

							<!-- <a href="#" class="card-link">Card link</a>
							<b-link href="#" class="card-link"
								>Another link</b-link
							> -->
						</b-card>
					</div>
				</b-col>
				<template v-for="_country in $page.countries.edges[0].node.countries">
					<b-col :key="_country.emoji">
						<div>
							<b-card
								bg-variant="dark"
								text-variant="white"
								:sub-title="_country.continent.name"
								class="mb-4 mb-2"
								style="height:400px; max-width:300px;"
							>
								<b-card-title>
									<h4 style="color: white">
										{{ _country.name }}
									</h4>
								</b-card-title>
								<b-card-text style="color:grey">
									Emoji: {{ _country.emoji }}
								</b-card-text>
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
				countries{
					name
					continent{
						name
					}
					languages{
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

}
</page-query>

<script>
// import { GraphQLClient, gql } from "graphql-request";

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
	async mounted() {
		// const client = new GraphQLClient("https://countries.trevorblades.com/");
		// const query = gql`
		// 	{
		// 		countries {
		// 			name
		// 			continent {
		// 				name
		// 			}
		// 			languages {
		// 				name
		// 				native
		// 			}
		// 			emoji
		// 		}
		// 	}
		// `;
		// const countries = await client.request(query);
		// this.countries = countries.countries;
		// console.log(countries)
		// console.log(this.countries);
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

<style>
.grid-container {
	display: grid;
	grid-template-columns: auto auto auto;
	padding: 10px;
}
.grid-item {
	/* background-color: rgba(255, 255, 255, 0.8); */
	/* border: 1px solid rgba(0, 0, 0, 0.8); */
	/* padding: 20px; */
	/* font-size: 30px; */
	/* text-align: center; */
}
</style>
