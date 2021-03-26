import React, { useEffect, useRef, useState, useCallback } from 'react';
import {topRatedUrl} from '../constants/constants';
const axios = require('axios');



export default async function TopRated() {
    try {
        let response = await fetch(topRatedUrl);
        response = await response.json()
        return response;
    } catch (error) {
        console.log(error);
    }

  
}
