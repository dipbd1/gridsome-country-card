<template>
	<Layout>
		<div class="post-title">
			<h1 class="post-title__text">
				{{ $page.experiment.title }}
			</h1>

			<PostMeta :post="$page.experiment" />
		</div>

		<div class="post content-box">
			<!-- <div class="post__header">
				<g-image
					alt="Cover image"
					v-if="$page.post.cover_image"
					:src="$page.post.cover_image"
				/>
			</div> -->

			<div class="post__content" v-html="$page.experiment.content" />

			<div class="post__footer">
				<PostTags :post="$page.experiment" />
			</div>
		</div>

		<div class="post-comments">
			<!-- Add comment widgets here -->
		</div>

		<Author class="post-author" />
	</Layout>
</template>

<script>
import PostMeta from "~/components/PostMeta";
import PostTags from "~/components/PostTags";
import Author from "~/components/Author.vue";

export default {
	components: {
		Author,
		PostMeta,
		PostTags,
	},
	metaInfo() {
		return {
			title: this.$page.experiment.title,
			meta: [
				{
					name: "description",
					content: this.$page.experiment.description,
				},
			],
		};
	},
  async mounted(){
    console.log(this.$page)
  }
};
</script>

<page-query>
query Experiment ($id: ID!) {
  experiment: experiment (id: $id) {
    title
    path
    timeToRead
    date (format: "D. MMMM YYYY")
    description
    content
  }
}
</page-query>

<style lang="scss">
.post-title {
	padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
	text-align: center;
}

.post {
	&__header {
		width: calc(100% + var(--space) * 2);
		margin-left: calc(var(--space) * -1);
		margin-top: calc(var(--space) * -1);
		margin-bottom: calc(var(--space) / 2);
		overflow: hidden;
		border-radius: var(--radius) var(--radius) 0 0;

		img {
			width: 100%;
		}

		&:empty {
			display: none;
		}
	}

	&__content {
		h2:first-child {
			margin-top: 0;
		}

		p:first-of-type {
			font-size: 1.2em;
			color: var(--title-color);
		}

		img {
			width: calc(100% + var(--space) * 2);
			margin-left: calc(var(--space) * -1);
			display: block;
			max-width: none;
		}
	}
}

.post-comments {
	padding: calc(var(--space) / 2);

	&:empty {
		display: none;
	}
}

.post-author {
	margin-top: calc(var(--space) / 2);
}
</style>
