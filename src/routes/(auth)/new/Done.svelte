<!-- TODO!!!! -->

<script lang="ts">
	import type { Hobby } from './util'
	import { Input } from '$lib/c/ui/input'
	import { Label } from '$lib/c/ui/label'
	import { Button, buttonVariants } from '$lib/c/ui/button'
	import { Textarea } from '$lib/c/ui/textarea'
	import * as Dialog from '$lib/c/ui/dialog'
	import { parse } from 'marked'

	const { data, explanation }: { data: Hobby; explanation: string } = $props()
	const form = $state(data)
	console.log({ data, explanation })
</script>

<h3 class="text-center text-lg md:text-left md:text-3xl">Create a Hobby</h3>

<form
	class="mx-auto w-[90%] max-w-screen-md"
>
	<div class="my-2">
		<Label for="name">Name</Label>
		<Input id="name" type="text" placeholder="A short name" value={form.name} />
	</div>
	<div class="my-2">
		<Label for="description">Description</Label>
		<Textarea
			id="description"
			placeholder="A small description of this hobby"
			value={form.description}
		/>
	</div>
	<div class="flex items-center justify-between">
		<Label for="explanation">Explanation</Label>
		<Dialog.Root>
			<Dialog.Trigger type="button" class={buttonVariants({ variant: 'outline' }) id="explanation"}
				>View LLM Explanation</Dialog.Trigger
			>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>LLM Response</Dialog.Title>
				</Dialog.Header>
				<div class="prose">
					{@html parse(explanation)}
				</div>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="my-4">
		<h4 class="text-lg md:text-xl">Goals</h4>
		{#each form.goals as goal, i}
		        <div class="my-2">
        <Label for="goal-{i}-title">Title</Label>
        <Input
          id="goal-{i}-title"
          type="text"
          placeholder="A short title"
          value={goal.title}
        />
      </div>
      <div class="my-2">
        <Label for="goal-{i}-description">Description</Label>
        <Textarea
          id="goal-{i}-description"
          placeholder="A small description of this goal"
          value={goal.description}
        />
      </div>
      <div class="my-4">
        <h5 class="text-md md:text-lg">Goal Tasks</h5>
        {#each goal.tasks as task, i}
          <div class="my-2">
            <Label for="goal-task-{i}-title">Title</Label>
            <Input
              id="goal-task-{i}-title"
              type="text"
              placeholder="A short title"
              value={task.title}
            />
          </div>
          <div class="my-2">
            <Label for="goal-task-{i}-description">Description</Label>
            <Textarea
              id="goal-task-{i}-description"
              placeholder="A small description of this task"
              value={task.description}
            />
          </div>
          <div class="my-4">
            <h6 class="text-sm md:text-md">Subtasks</h6>
            {#each task.subtasks as subtask}
              <div class="my-2">
                <Label for="subtask-title">Title</Label>
                <Input
                  name="subtask-title"
                  id="subtask-title"
                  type="text"
                  placeholder="A short title"
                  value={subtask.title}
                />
              </div>
              <div class="my-2">
                <Label for="subtask-description">Description</Label>
                <Textarea
                  name="subtask-description"
                  id="subtask-description"
                  placeholder="A small description of this subtask"
                  value={subtask.description}
                />
              </div>
              <div class="my-2">
                <Label for="subtask-reminder">Reminder</Label>
                <Input
                  name="subtask-
		{/each}
	</div>
</form>
