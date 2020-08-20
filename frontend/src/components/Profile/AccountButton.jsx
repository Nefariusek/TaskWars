import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Modal } from 'semantic-ui-react';
import AccountModal from './AccountModal';

class AccountButton extends React.Component {
    render() {
        return (
            <div className="accountButton">
                <Modal trigger={
                    <Button id='button' animated='fade'>
                        <Button.Content visible>Account</Button.Content>
                        <Button.Content hidden>Edit Account</Button.Content>
                    </Button>
                } size="tiny">
                    <AccountModal id={this.props.id} email={this.props.email} userName={this.props.userName} />
                </Modal>
            </div>
        );
    }
}

export default AccountButton;


