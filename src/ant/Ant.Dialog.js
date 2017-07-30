import { Modal } from 'antd'

const error = (title = '', content = '', onOk = () => {
    console.warn("[JOY] The onOk function has not been implemented.");
}) => {
    Modal.error({
        title, content, onOk
    })
};

const confirm = (title = '', content = '', onOk = () => {
    console.warn("[JOY] The onOk function has not been implemented.");
}) => {
    Modal.confirm({
        title, content, onOk
    })
};

const $confirm = (title = '', content = '', onOk) => {
    return () => {
        confirm(title, content, onOk);
    }
};

export default {
    error,
    confirm,
    $confirm
}
