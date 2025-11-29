<script lang="ts">
	import Icon from '../global/Icon.svelte';

	interface RepoItemProps {
		repository: GithubRepository;
	}
	const props: RepoItemProps = $props();
	const { repository } = props;

	const handleGoToRepository = () => {
		window.open(repository.html_url, '_blank');
	};

	const getVisibilityColor = (visibility: 'public' | 'private') => {
		switch (visibility) {
			case 'public':
				return 'bg-green-500/30';
			case 'private':
				return 'bg-red-500/30';
			default:
				return 'bg-gray-500/30';
		}
	};
</script>

<li>
	<div class="flex flex-col gap-1 rounded-md bg-light/10 p-2">
		<div class="flex items-center justify-between">
			<h3 class="text-xl font-bold">{repository.name}</h3>
			<div class="flex items-center gap-2">
				<span
					class="rounded-md {getVisibilityColor(
						repository.visibility
					)} px-2 py-1 text-light capitalize"
				>
					{repository.visibility}
				</span>
				<button
					class="flex items-center gap-2 rounded-full bg-primary/80 p-2 text-light"
					onclick={handleGoToRepository}
				>
					<Icon name="link" width="16" height="16" fill="white" />
				</button>
			</div>
		</div>
		<p class="line-clamp-2 text-sm text-light italic">{repository.description}</p>
		<p>
			<span class="font-bold">Owner:</span>
			{repository.owner.login}
		</p>
	</div>
</li>
