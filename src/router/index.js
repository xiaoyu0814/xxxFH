import Vue from 'vue'
import Router from 'vue-router'
import Load from '@/pages/load/index'
import IndexPage from '@/components/IndexPage'
import HelloWorld from '@/pages/new/HelloWorld'
import dataManagement from '@/pages/dataManagement'
import operationalOrganization from '@/pages/operationalOrganization/operationalOrganization'
import operationalDeployment from '@/pages/operationalDeployment/operationalDeployment'
import intervene from '@/pages/intervene'
import seatAllocation from '@/pages/seatAllocation/seatAllocation'
import seatStatus from '@/pages/seatAllocation/seatStatus'
import situationDisplay from '@/pages/situationDisplay'
import atmosphereIntervention from '@/pages/controlIntervention/atmosphereIntervention'
import electromagnetismIntervention from '@/pages/controlIntervention/electromagnetismIntervention'
import NBCEnvironmentalIntervention from '@/pages/controlIntervention/NBCEnvironmentalIntervention'
import bingliganyu from '@/pages/controlIntervention/bingliganyu'
import operationStatusMonitoring from '@/pages/trainingMonitoring/operationStatusMonitoring'
import assessmentTaskManagement from '@/pages/trainingAssessment/assessmentTaskManagement'
import assessmentPresentationManagement from '@/pages/trainingAssessment/assessmentPresentationManagement'
import listOfWarDamageAndResults from '@/pages/warDamageResult/listOfWarDamageAndResults'
import missionPlanning from '@/pages/missionPlanning'
import operationManagement from '@/pages/operationManagement'
import time from '@/pages/time'
import cloudData from '@/pages/cloudData'


Vue.use(Router)

export const appRouter = new Router({
  routes: [{
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      redirect: '/operationalOrganization',
      children: [{
        path: '/dataManagement',
        name: 'dataManagement',
        component: dataManagement
      }, {
        path: '/operationalOrganization',
        name: 'operationalOrganization',
        component: operationalOrganization
      }, {
        path: '/seatAllocation',
        name: 'seatAllocation',
        component: seatAllocation
      }, {
        path: '/seatStatus',
        name: 'seatStatus',
        component: seatStatus
      }, {
        path: '/operationalDeployment',
        name: 'operationalDeployment',
        component: operationalDeployment
      }, {
        path: '/intervene',
        name: 'intervene',
        component: intervene
      }, {
        path: '/situationDisplay',
        name: 'situationDisplay',
        component: situationDisplay
      }, {
        path: '/electromagnetismIntervention',
        name: 'electromagnetismIntervention',
        component: electromagnetismIntervention
      },  {
        path: '/NBCEnvironmentalIntervention',
        name: 'NBCEnvironmentalIntervention',
        component: NBCEnvironmentalIntervention
      },{
        path: '/bingliganyu',
        name: 'bingliganyu',
        component: bingliganyu
      }, {
        path: '/atmosphereIntervention',
        name: 'atmosphereIntervention',
        component: atmosphereIntervention
      }, {
        path: '/operationStatusMonitoring',
        name: 'operationStatusMonitoring',
        component: operationStatusMonitoring
      }, {
        path: '/assessmentTaskManagement',
        name: 'assessmentTaskManagement',
        component: assessmentTaskManagement
      }, {
        path: '/assessmentPresentationManagement',
        name: 'assessmentPresentationManagement',
        component: assessmentPresentationManagement
      }, {
        path: '/listOfWarDamageAndResults',
        name: 'listOfWarDamageAndResults',
        component: listOfWarDamageAndResults
      }, {
        path: '/missionPlanning',
        name: 'missionPlanning',
        component: missionPlanning
      }, {
        path: '/operationManagement',
        name: 'operationManagement',
        component: operationManagement
      },{
        path: '/cloudData',
        name: 'cloudData',
        component: cloudData
      },]
    },
    {
      path: '/login',
      name: 'Load',
      component: Load
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/time',
      name: 'time',
      component: time
    }
  ]
})
