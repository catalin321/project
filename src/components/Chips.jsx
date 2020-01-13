import React, {Component, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';


export default class Chips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: props.entries
    }
  }

  findEntryIndex = id => {
    const entries = this.state.entries;
    const index = entries.findIndex(entry => entry.id === id);
    
    return index;
  }

  edit = (id) => {

    const index = this.findEntryIndex(id);
    const entries = [...this.state.entries];
    entries[index].editMode = true;
   
    this.setState({ entries });
  } 

  blur = (id) => {

    const index = this.findEntryIndex(id);
    const entries = [...this.state.entries];
    entries[index].editMode = false;
   
    this.setState({ entries });
  }

  change = (event, id) => {

    const index = this.findEntryIndex(id);
    const value = event.currentTarget.value;
    const [firstName, lastName=''] = value.split(' ');
    
    const entries = [...this.state.entries];
    entries[index].firstName = firstName;
    entries[index].lastName = lastName;

    this.setState({ entries });
  }

  remove = (event, id) => {
    event.stopPropagation();

    const index = this.findEntryIndex(id);
    const entries = [...this.state.entries];
    entries.splice(index, 1);
    this.setState({ entries });
  }

  render() {

    return (
      <StyledChip>
        {
          this.state.entries.map( entry => 
            <Chip 
              key={entry.id} 
              name={(entry.firstName || '') + ' ' + (entry.lastName || '')}
              email={entry.email || ''}
              enabled={entry.enabled}
              editMode={entry.editMode}
              edit={() => this.edit(entry.id)}
              blur={() => this.blur(entry.id)}
              change={(event) => this.change(event, entry.id)}
              remove={(event) => this.remove(event, entry.id)}/>
          )
        }
      </StyledChip>
    );
  }
}

const Chip = (props) => {

    const {name, email, enabled, editMode, ref} = props;
    const {change, edit, remove, blur} = props;
  
    const inputRef = useRef(null);

    useEffect(() => {
      if(editMode) {
        inputRef.current && inputRef.current.focus()
      }
    }, [editMode]);
  
    return (
      editMode ? (
        <input 
          className='chip-input'
          type="text" 
          onChange={change}
          onBlur={blur}
          enabled={enabled.toString()}
          ref={inputRef}
          value={name}/> 
        ) : (
        <div 
          className={enabled ? 'chip' : 'chip disabled'}
          onClick={enabled ? edit : null}>
          <span className='chip-label'>
              {name}
          </span>
          {
            enabled && 
            <span 
              onClick={remove}
              className='btn-remove'>
              <IconButton aria-label="cancel">
                <CancelIcon />
              </IconButton>
            </span>
          }
        </div>)
    );
  }

const StyledChip = styled.div`
  width: 60%;
  margin: 100px auto;
  padding: 40px;
  background: papayawhip;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .chip, .chip-input {
    display: inline-flex;
    margin: 4px;
    outline: 0;
    padding: 0;
    height: 32px;
    font-size: 16px;
    align-items: center;
    border-radius: 10px;
    color: rgba(0, 0, 0, 0.87);
    background-color: #98FB98;
    white-space: nowrap;
    font-family: Arial;
    border-radius: 16px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    cursor: default;
    .chip-label {
      overflow: hidden;
      white-space: nowrap;
      padding-left: 12px;
      padding-right: 3px;
      text-overflow: ellipsis;
    }
    .btn-remove {
      .MuiIconButton-root {
        padding: 2px;
      }
    }
  }
  .chip.disabled {
    cursor: initial;
    background-color: #e0e0e0;
    .chip-label {
      padding-right: 12px;
    }
  }
  .chip-input {
    padding-left: 12px;
    border: none;
  }
`;


