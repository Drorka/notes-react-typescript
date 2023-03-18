import { Link, useNavigate } from 'react-router-dom'
import { Card, Stack, Row, Col, Button, Badge } from 'react-bootstrap'
import { Tag } from '../App'
import styles from '../assets/NoteList.module.css'

export interface SimplifiedNote {
	id: string
	title: string
	tags: Tag[]
}

export function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<Card
			as={Link}
			to={`/${id}`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
		>
			<Card.Body>
				<Stack
					gap={2}
					className="align-items-center justify-content-center h-100"
				>
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (
						<Stack
							gap={1}
							direction="horizontal"
							className="justify-content-center flex-wrap"
						>
							{tags.map((tag) => (
								<Badge
									key={tag.id}
									className="align-items-center justify-content-center text-truncates"
								>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	)
}
