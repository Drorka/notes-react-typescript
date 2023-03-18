import 'bootstrap/dist/css/bootstrap.min.css'
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { useLocalStorage } from './hooks/useLocalStorage'
import { NewNote } from './pages/NewNote'

export interface Note extends NoteData {
	id: string
}

export interface NoteData {
	title: string
	markdown: string
	tags: Tag[]
}

export interface Tag {
	id: string
	label: string
}

export interface RawNote extends RawNoteData {
	id: string
}

export interface RawNoteData {
	title: string
	markdown: string
	tagIds: string[]
}

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
			}
		})
	}, [notes, tags])

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
			]
		})
	}

	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag])
	}

	return (
		<Container className="my-4">
			<Routes>
				<Route path="/" element={<h1>Home</h1>} />
				<Route
					path="/new"
					element={
						<NewNote
							onSubmit={onCreateNote}
							onAddTag={addTag}
							availableTags={tags}
						/>
					}
				/>
				<Route path="/:id">
					<Route index element={<h1>Show</h1>} />
					<Route path="/:id/edit" element={<h1>Edit</h1>} />
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
