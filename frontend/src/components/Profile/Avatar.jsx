import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Modal } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import AvatarModal from './AvatarModal';

class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.avatarHoverRef = React.createRef();
        this.state = {
            avatar: this.props.avatar,
            id: this.props.id
        }
    }

    componentDidMount() {
        this.avatarHoverRef.current.style.opacity = "0%"
        this.avatarHoverRef.current.addEventListener("mouseover", this.onMouseOverAvatar);
        this.avatarHoverRef.current.addEventListener("mouseleave", this.onMouseLeaveAvatar);
    }

    componentDidUpdate(prevProps) {
        if (this.props.avatar !== prevProps.avatar) {
            this.setState({
                avatar: this.props.avatar,
                id: this.props.id
            })
        }
    }

    onMouseOverAvatar = () => {
        this.avatarHoverRef.current.style.opacity = "70%";
    }

    onMouseLeaveAvatar = () => {
        this.avatarHoverRef.current.style.opacity = "0%";
    }

    handleClose = (img) => {
        this.img = img;
    }

    onModalClose = () => {
        this.setState({ avatar: this.img });
        this.putAvatar(this.img);
        // const creature_id = "5e093912540e7c26c0ac53a8";
        // const guild_id = "5e093912540e7c26c0ac53b4";
        // const guild_name = "Guild_0";
        // const task_id = "5e093911540e7c26c0ac5383"
        // this.addCreatureToFight(creature_id, guild_id, guild_name, task_id);
        //this.addTaskToMemebers(task_id, guild_id);
    }

    // addCreatureToFight = async (creature_id, guild_id, guild_name, task_id) => {
    //     const creatureResponse = await fetch(`/api/creatures/${creature_id}`, setHeaders());
    //     const creature = await creatureResponse.json();

    //     //something not work,
    //     let task_to_dmg = await this.addTaskToMemebers(task_id, guild_id)
    //     creature.task_to_dmg = task_to_dmg;

    //     const data = {
    //         name: guild_name,
    //         current_fight: creature
    //     }
    //     const params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};
    //     const response = await fetch(`/api/guilds/${guild_id}/current_fight`, params);
    //     const body = await response.json();
    // }

    // addTaskToMemebers = async (task_id, guild_id) => {
    //     const guildResponse = await fetch(`/api/guilds/${guild_id}`, setHeaders());
    //     const guild = await guildResponse.json();

    //     const taskResponse = await fetch(`/api/tasks/${task_id}`, setHeaders());
    //     const task = await taskResponse.json();

    //     let data = _.omit(task, ['_id', '__v', '__proto']);
    //     let params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};

    //     const task_to_dmg = [];
    //     const requests = guild.members.map(async (member_id) => {
    //         const memberResponse = await fetch(`/api/characters/${member_id}`, setHeaders());
    //         const member = await memberResponse.json();

    //         const memberTasksResponse = await fetch(`/api/questbook/${member.questbook_id}/task`, params);
    //         const memberTasks = await memberTasksResponse.json();
    //         return memberTasks.tasks[memberTasks.tasks.length-1]._id;
    //         // task_to_dmg.push(memberTasks.tasks[memberTasks.tasks.length-1]._id);

    //     })

    //     return Promise.all(requests)
    //         .then(id =>{
    //             task_to_dmg.push(...id)
    //         })
    //         .then(() => {
    //             return task_to_dmg;
    //         })
    // }

    // atackCreature(creature_id) {

    // }

    putAvatar = async (img) => {
        const data = {
            avatar: img
        };
        let params = { ...setHeaders(), body: JSON.stringify(data), method: "PUT" };
        await fetch(`/api/characters/${this.props.id}/avatar`, params);
    }

    render() {
        return (
            <div className="avatarWrap">
                <Modal
                    size="small"
                    trigger={
                        <div id='avatarHover' ref={this.avatarHoverRef}>
                            <h1>Change avatar</h1>
                        </div>
                    }
                    onClose={this.onModalClose}
                >
                    <AvatarModal img={this.state.avatar} handleClose={this.handleClose} />
                </Modal>
                <div className='avatarDiv'>
                    <Image id='avatar' src={this.state.avatar} size='medium' rounded />
                </div>
            </div>
        );
    }
}

export default Avatar