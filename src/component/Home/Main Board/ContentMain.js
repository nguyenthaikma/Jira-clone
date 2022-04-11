import { message } from 'antd';
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { _GET_TASK_DETAIL_SAGA, _UPDATE_STATUS_SAGA } from '../../../redux/actions/TaskActions';



export default function ContentMain(props) {

    const dispatch = useDispatch();
    const data = props.data;

    const handleDragEnd = (value) => {
        const { destination, draggableId, source } = value;

        if(!destination) {
            return ;
        }


        if(source.droppableId === destination.droppableId && source.index === destination.index) {
            return ;
        }

        const dataDispatch = {
            content: {
                taskId: Number(draggableId),
                statusId: destination.droppableId
            },
            projectId: data.id
        }
        dispatch(_UPDATE_STATUS_SAGA(dataDispatch));
    }

    const renderCard = () => {
        return <DragDropContext
            onDragEnd={handleDragEnd}
        >
            {data.lstTask?.map((taskDetail, index) => {
                return <Droppable
                    droppableId={taskDetail.statusId}
                    key={index}
                >
                    {(provided) => {
                        return <div className="card">
                            <div className="card-header">
                                {taskDetail.statusName}
                            </div>
                            <ul ref={provided.innerRef}
                                {...provided.innerRef}
                                className="list-group list-group-flush">
                                {taskDetail.lstTaskDeTail.map((taskDetail, index) => {
                                    return <Draggable
                                        key={index}
                                        draggableId={taskDetail.taskId.toString()}
                                        index={index}
                                    >
                                        {(provided) => {
                                            return <li
                                                style={{outline: 'none !important'}}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => {
                                                    dispatch({ type: 'CLOSE_EDIT_NAME' })
                                                    dispatch({ type: 'CLOSE_SET_DESC' });
                                                    dispatch(_GET_TASK_DETAIL_SAGA(taskDetail.taskId));
                                                }}
                                                className="list-group-item"
                                                data-toggle="modal"
                                                data-target="#infoModal"
                                            >
                                                {taskDetail.taskName}
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left text-success">
                                                        {taskDetail.priorityTask.priority}
                                                    </div>
                                                    <div className="block-right">
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            {taskDetail.assigness.map((assign, index) => {
                                                                return <div key={index} className="avatar">
                                                                    <img src={assign.avatar} alt={assign.id} />
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        }}
                                    </Draggable>
                                })}
                                {provided.placeholder}
                            </ul>
                        </div>
                    }}
                </Droppable>
            })}
        </DragDropContext>
    }

    return (
        <div>
            <div className="content d-flex">
                {renderCard()}
            </div>
        </div>
    )
}
