import { Modal, Form, Stack, Row, Col, Button } from 'react-bootstrap'
import { Tag } from '../App'

export type EditTagsModalProps = {
	onUpdateTag: (id: string, label: string) => void
	onDeleteTag: (id: string) => void
	availableTags: Tag[]
	show: boolean
	handleClose: () => void
}

export function EditTagsModal({
	onUpdateTag,
	onDeleteTag,
	availableTags,
	show,
	handleClose,
}: EditTagsModalProps) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										type="text"
										value={tag.label}
										onChange={(e) => onUpdateTag(tag.id, e.target.value)}
									/>
								</Col>
								<Col xs="auto">
									<Button
										onClick={() => onDeleteTag(tag.id)}
										variant="outline-danger"
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	)
}
