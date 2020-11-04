import React from 'react'
import { format } from 'date-fns/fp'
import * as Ionicons from '@styled-icons/ionicons-outline'

export interface Event {
  id: string;
  eventType: string;
  visitId: string;
  caregiverId?: string;
  careRecipientId: string;
  timestamp: Date;
}

const getEventTypeIcon = (eventType: string) => {
  switch (eventType) {
    case 'check_in':
      return Ionicons.LogIn
    case 'check_out':
      return Ionicons.LogOut
    case 'task_completion_reverted':
      return Ionicons.ArrowUndo

    case 'task_completed':
      return Ionicons.Checkmark

    case 'visit_completed':
      return Ionicons.CheckmarkDone

    case 'visit_cancelled':
      return Ionicons.Close

    case 'regular_medication_taken':
    case 'regular_medication_partially_taken':
    case 'regular_medication_maybe_taken':
    case 'regular_medication_not_taken':
    case 'no_medication_observation_received':
      return Ionicons.Medkit

    case 'alert_raised':
    case 'alert_qualified':
    case 'concern_raised':
      return Ionicons.Alert

    case 'mood_observation':
    case 'general_observation':
    case 'physical_health_observation':
    case 'incontinence_pad_observation':
    case 'food_intake_observation':
    case 'mental_health_observation':
    case 'catheter_observation':
    case 'fluid_intake_observation':
    case 'toilet_visit_recorded':
      return Ionicons.Create

    case 'medication_schedule_updated':
    case 'medication_schedule_created':
    case 'task_schedule_created':
      return Ionicons.Create
  }
}

const getEventTypeText = (eventType: string) =>
  eventType.split('_').map(x => `${x.charAt(0).toUpperCase()}${x.substr(1)}`).join(' ')

interface EventsListItemProps {
  event: Event;
}

const EventsListItem: React.FC<EventsListItemProps> = ({ event }) => {
  const date = new Date(event.timestamp)
  const EventTypeIcon = getEventTypeIcon(event.eventType)
  return (
    <>
      <EventTypeIcon size={24} />
      <div>{getEventTypeText(event.eventType)}</div>
      <div>{format('HH:mm:ss', date)}</div>
    </>
  )
}

export default EventsListItem
