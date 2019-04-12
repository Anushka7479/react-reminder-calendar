import React from 'react';
import { connect } from 'react-redux';
import Calendar from '../components/calendar/calendar';
import CaledarReminder from '../components/calendar/calendar.reminder';
import Modal from '../components/modal';
import Reminder from './components/reminder';
import { getCurrentDate, getRemindersByDate, getSelectedItem } from './state';
import {
  moveBacward,
  moveForward,
  addItem,
  editItem,
  saveItem,
  deleteItem,
  cancelEdit,
  selectToday
} from './state/actions';

const RemindersCalendar = (props) => {
  const {
    selectedItem,
    onCancelEdit,
    onSave,
    onDelete,
    remindersByDate,
    ...calendarProps
  } = props;

  let reminderModal = null;
  if (selectedItem) {
    reminderModal = (
      <Modal>
        <Reminder
          item={selectedItem}
          onCancelEdit={onCancelEdit}
          onSave={onSave}
          onDelete={onDelete}
        />
      </Modal>
    );
  }

  function renderReminders(dayId) {
    if (!remindersByDate[dayId]) {
      return null;
    }
    return remindersByDate[dayId].map(reminder => (
      <CaledarReminder {...reminder} onEdit={props.onEdit} key={reminder.id} />
    ));
  }

  return (
    <>
      {reminderModal}
      <Calendar {...calendarProps} dayRender={renderReminders} />
    </>
  );
};

const mapStateToProps = state => ({
  date: getCurrentDate(state),
  remindersByDate: getRemindersByDate(state),
  selectedItem: getSelectedItem(state)
});

const mapDispatchToProps = dispatch => ({
  onPrevious: () => dispatch(moveBacward()),
  onNext: () => dispatch(moveForward()),
  onToday: () => dispatch(selectToday()),
  onAddNew: () => dispatch(addItem()),
  onEdit: id => dispatch(editItem(id)),
  onSave: item => dispatch(saveItem(item)),
  onDelete: id => dispatch(deleteItem(id)),
  onCancelEdit: () => dispatch(cancelEdit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemindersCalendar);
