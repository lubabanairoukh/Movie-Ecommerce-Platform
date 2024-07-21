import React, { useContext } from 'react';
import { HistoryContext } from './HistoryContext';
import './HistoryList.css';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const HistoryList = ({ setData}) => {
    const { history,setHistory,addToHistory, clearHistory } = useContext(HistoryContext);


    const handleDeleteItem = (index) => {
        setHistory((prevHistory) => {
            const updatedHistory = [...prevHistory];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
    };

    const onItemClick=(item)=>{
        setData({url:item.url, params:item.params, options:item.options, fetchFromHistory:true});
    }
    const handleClearAllHistory = () => {
        clearHistory();
    };

    return (
        <div className="History-Page">
            <Row>
                <Col lg={6}>
                    <h2>Search History</h2>
                </Col>
                <Col lg={6}>
                    <h6 className="history-item" onClick={handleClearAllHistory}>
                        clear all history
                    </h6>
                </Col>
            </Row>

            <ul>
                {history.map((item, index) => (
                    <Row key={index}>
                        <Col lg={6}>
                            <li
                                onClick={() => onItemClick(item)}
                                className="history-item"
                            >
                                {item.stringSearch}
                            </li>
                        </Col>
                        <Col lg={6}>
                            <FontAwesomeIcon
                                onClick={() => handleDeleteItem(index)}
                                icon={faTrash}
                                size="xs"
                                style={{ color: '#090e15' }}
                            />
                        </Col>
                    </Row>
                ))}
            </ul>
        </div>
    );
};

export default HistoryList;
