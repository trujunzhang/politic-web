
const Parse = require('parse')
import moment from 'moment'

export default class PostsParameters {
    constructor (query: Parse.Query) {
        this.query = query
    }

    addParameters(terms: Any){
        if(terms.before && terms.after){

            var mAfter = moment(terms.after, "YYYY-MM-DD");
            var startOfDay = mAfter.startOf('day');

            // from the start of the date (inclusive)
            this.query.greaterThanOrEqualTo('createdAt', startOfDay.toDate());


            var mBefore = moment(terms.before, "YYYY-MM-DD");
            var endOfDay = mBefore.endOf('day');

            // till the start of tomorrow (non-inclusive)
            this.query.lessThan('createdAt', endOfDay.toDate());
        } 



        return this
    }


    end(){
        return this.query
    }

}


