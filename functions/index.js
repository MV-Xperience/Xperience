const functions = require('firebase-functions');
const Filter = require('bad-words');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.detectCrudeQuestions = functions.firestore
    .document('questions/{questionID}')
    .onCreate(async (doc, ctx) => {
        const filter = new Filter();
        if (filter.isProfane(doc.data().text)) {
            await doc.ref.delete();

            db.doc('users/' + doc.data().uid).update({
                questionIds: admin.firestore.FieldValue.arrayRemove(doc.id),
                strikes: admin.firestore.FieldValue.increment(1)
            })  
        } 
        
    }
)

exports.detectCrudeReviews = functions.firestore
    .document('classes/{classID}/reviews/{reviewID}')
    .onCreate(async (doc, ctx) => {
        const filter = new Filter();
        if (filter.isProfane(doc.data().text)) {
            await doc.ref.delete();

            db.doc('users/' + doc.data().uid).update({
                reviewedClasses: admin.firestore.FieldValue.arrayRemove(doc.id),
                strikes: admin.firestore.FieldValue.increment(1)
            })  

        } 
        
    }
)

exports.addReportsToUserBasedOnQuestion = functions.firestore
    .document('questions/{questionID}')
    .onUpdate(async (doc, ctx) => {
        const data = change.after.data();
        if(data.reportedBy.length > 2){
            db.doc('users/' + data.uid).update({
                strikes: admin.firestore.FieldValue.increment(1)
            });
        }
    }
)

exports.addReportsToBannedUserBasedOnReply = functions.firestore
    .document('questions/{questionID}/replies/{replyID}')
    .onUpdate(async (doc, ctx) => {
        const data = change.after.data();
        if(data.reportedBy.length > 2){
            db.doc('users/' + data.uid).update({
                strikes: admin.firestore.FieldValue.increment(1)
            });
        }
    }
)


exports.addReportsToBannedUserBasedOnReview = functions.firestore
    .document('classes/{class}/reviews/{review}')
    .onUpdate(async (doc, ctx) => {
        const data = change.after.data();
        if(data.reportedBy.length > 2){
            db.doc('users/' + data.uid).update({
                strikes: admin.firestore.FieldValue.increment(1)
            });
        }
    }
)


exports.stikeOut = functions.firestore
    .document('users/{uid}')
    .onUpdate(async (doc, ctx) => {
        const data = change.after.data();
        if(data.strikes > 2){
            await db.doc('users/' + data.uid).update({
                banned: true,
            });

            await db.doc('bannedUsers/' + data.uid).set({
                uid: data.uid,
            });
        }
    }
)
