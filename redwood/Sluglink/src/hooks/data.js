import create from "zustand";

/**
 * User {
 *  uid: string,
 *  email: string,
 *  email_verified: bool,
 *  phone_number: string,
 *  createdAt: server timestamp,
 *  lastLogin: server timestamp,
 * 
 * 
 *  is_student: bool,
 *  is_organization: bool,
 *  name: string,
 *  picture: string, // url
 *  description: string,
 *  tags: array<string>,
 *  contact: {
 *      name: string,
 *      email: string,
 *      role: string, // 'student' for students
 *  },
 *  event_link: string,
 * 
 * ==== Events Collection ====
 *  /User/{user_uid}/Events/{event_uid} {
 *      event_uid: string,
 *      interaction: ENUM { 'Created', 'Liked', 'Viewed' }
 *  }
 * }
 */

/**
 * Event {
 *  uid: string,
 *  name: string,
 *  description: string,
 *  type: ENUM { 'virtual', 'physical', 'hybrid' },
 *  organizer_uid: string,
 *  organizer_name: string,
 *  pictures: array<string>, // urls
 *  
 *  
 * }
 */

export const useData = create((set, get) => ({
    // Users include both Students & Organizations
    PATHS: {
        user: (uid) => `Users/${uid}`,
        
    },
    set: (path, data) => {

    },
    get: (path) => {

    },
    listen: (path) => {

    }
}));