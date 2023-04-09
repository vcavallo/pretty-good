import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import {
  noProfilePicUrl,
} from 'renderer/window1/const';

export const foo = () => {};

export const extractNodesAndEdges = (
  oMyNostrProfileData,
  oNostrProfilesData,
  propertyPath,
  aCuratedListInstances,
  aRatingsOfInstancesData,
  aEndorsementsOfCuratorsData,
  controlPanelSettings,
) => {
  const oResults = {
    aNodes: [],
    aEdges: [],
  };

  const {
    attenuationFactor,
    rigor,
    defaultUserTrustAverageScore,
    defaultUserTrustConfidence,
    defaultInstanceBaselineAverageScore,
    defaultInstanceBaselineConfidence,
    strat1Coeff,
    strat2Coeff,
    strat3Coeff,
    strat4Coeff,
    strat5Coeff,
  } = controlPanelSettings;
  const ave = defaultUserTrustAverageScore / 100;
  const cer = defaultUserTrustConfidence / 100;
  const inf = ave * cer;
  const uDefaultScores = {
    influence: inf,
    average: ave,
    certainty: cer,
    input: 0,
  }
  const uScoresDefault = {
    allPurposeTypes_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
    allListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
    thisListCuration_allContexts: JSON.parse(JSON.stringify(uDefaultScores)),
  };
  const iAve = defaultInstanceBaselineAverageScore / 100;
  const iCer = defaultInstanceBaselineConfidence / 100;
  const iInf = iAve * iCer;
  const iDefaultScores = {
    influence: iInf,
    average: iAve,
    certainty: iCer,
    input: 0,
  }
  const iScoresDefault = {
    allPurposeTypes_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
    allListCuration_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
    thisListCuration_allContexts: JSON.parse(JSON.stringify(iDefaultScores)),
  };

  const aNodesIDs = [];
  const aEdgesIDs = [];

  const myPubKey = oMyNostrProfileData.pubkey;
  const myName = oMyNostrProfileData.name;
  const myDisplayName = oMyNostrProfileData.display_name;
  let myImageUrl = oMyNostrProfileData.picture_url;
  if (!myImageUrl) {
    myImageUrl = noProfilePicUrl
  }
  const oNode = {
    id: myPubKey,
    group: "user",
    image: myImageUrl,
    brokenImage: noProfilePicUrl,
    shape: 'circularImage',
    title: myDisplayName,
    label: myName,
    name: myName,
    display_name: myDisplayName,
    afferentEdgeIDs: [],
    seed: true,
    scores: JSON.parse(JSON.stringify(uScoresDefault)),
    size: 50,
    physics: true,
    fixed: true,
    x: -200,
    y: 0,
  }
  oResults.aNodes.push(oNode);
  aNodesIDs.push(myPubKey);

  // ADD ITEMS
  /*
  for (let x = 0; x < aCuratedListInstances.length; x++) {
    const oItemEvent = JSON.parse(aCuratedListInstances[x].event);
    const itemEventID = oItemEvent.id;
    let oItemWord = {};
    if (doesEventValidate(oItemEvent)) {
      oItemWord = JSON.parse(oItemEvent.content);
      // oItemWord[propertyPath]
    }
    const oNode = { id: itemEventID, label: itemEventID };
    oResults.aNodes.push(oNode);
  }
  */

  for (let r=0;r<aEndorsementsOfCuratorsData.length;r++) {
    const oEndorsementSql = aEndorsementsOfCuratorsData[r];
    const oEndorsementEvent = JSON.parse(oEndorsementSql.event);
    const oEndorsementWord = JSON.parse(oEndorsementEvent.content);
    const endorsement_event_id = oEndorsementEvent.id;
    // console.log("oEndorsementWord: "+JSON.stringify(oEndorsementWord))
    const ratingTemplateSlug = oEndorsementWord.ratingData.ratingTemplateData.ratingTemplateSlug;
    if (ratingTemplateSlug=="nostrCuratedListsCuratorEndorsement") {
      // rater data
      const pk_rater = oEndorsementWord.ratingData.raterData.nostrProfileData.pubkey;
      const name_rater = oEndorsementWord.ratingData.raterData.nostrProfileData?.name;
      const display_name_rater = oEndorsementWord.ratingData.raterData.nostrProfileData?.display_name;
      // ratee data
      const pk_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData.pubkey;
      const name_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData?.name;
      const display_name_ratee = oEndorsementWord.ratingData.rateeData.nostrProfileData?.display_name;
      // rating data
      const regularSliderRating = oEndorsementWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.regularSliderRating;
      const referenceRegularSliderRating = oEndorsementWord.ratingData.ratingFieldsetData.nostrCuratedListsCuratorEndorsementFieldsetData.referenceRegularSliderRating;
      const confidence = oEndorsementWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;

      let rater_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_rater]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_rater].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          rater_profilePicUrl = oProfileContent.picture;
        }
      }

      let ratee_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_ratee]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_ratee].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          ratee_profilePicUrl = oProfileContent.picture;
        }
      }

      if (!aEdgesIDs.includes(endorsement_event_id)) {
        // add endorsement as another edge
        let title = '';
        const rating = (regularSliderRating / referenceRegularSliderRating).toPrecision(4);
        title += 'rating: '+ rating;
        title += '\n confidence: '+confidence;
        const width = 5 * Math.log(rating * 10);
        if (!rater_profilePicUrl) {
          rater_profilePicUrl = noProfilePicUrl;
        }
        const oEdge = {
          id: endorsement_event_id,
          // group: 'ratingOfInstance', // no group styling for edges (I think ???)
          from: pk_rater,
          to: pk_ratee,
          color: {
            color: '#0000FF',
            opacity: 1.0,
          },
          title: title,
          width: width,
          rating: rating,
        }
        oResults.aEdges.push(oEdge);
        aEdgesIDs.push(endorsement_event_id);
      }

      if (!aNodesIDs.includes(pk_rater)) {
        // add rater as another rater node
        let oNode = {
          id: pk_rater,
          group: "user",
          shape: 'circularImage',
          image: rater_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_rater,
          label: name_rater,
          name: name_rater,
          display_name: display_name_rater,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_rater == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
        }
        oResults.aNodes.push(oNode);
        aNodesIDs.push(pk_rater);
      }

      if (!aNodesIDs.includes(pk_ratee)) {
        // add ratee as another ratee node
        let oNode = {
          id: pk_ratee,
          group: "user",
          shape: 'circularImage',
          image: ratee_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_ratee,
          label: name_ratee,
          name: name_ratee,
          display_name: display_name_ratee,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_ratee == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
          oNode.size = 50;
          oNode.physics = false;
          oNode.x = -200;
          oNode.y = 0;
        }
        oResults.aNodes.push(oNode);
        aNodesIDs.push(pk_ratee);
      }
    }
  }

  for (let r=0;r<aRatingsOfInstancesData.length;r++) {
    const oRatingSql = aRatingsOfInstancesData[r];
    const oRatingEvent = JSON.parse(oRatingSql.event);
    const oRatingWord = JSON.parse(oRatingEvent.content);
    const rating_event_id = oRatingEvent.id;
    // ratingTemplateData
    const ratingTemplateSlug = oRatingWord.ratingData.ratingTemplateData.ratingTemplateSlug;
    if (ratingTemplateSlug=="nostrCuratedListInstanceGenericRating") {
      // rater data
      const pk_rater = oRatingWord.ratingData.raterData.nostrProfileData.pubkey;
      const name_rater = oRatingWord.ratingData.raterData.nostrProfileData?.name;
      const display_name_rater = oRatingWord.ratingData.raterData.nostrProfileData?.display_name;
      // ratee data
      const instance_event_id = oRatingWord.ratingData.rateeData.nostrCuratedListInstanceData.eventID;
      const instance_name = oRatingWord.ratingData.rateeData.nostrCuratedListInstanceData?.name;
      // rating data
      const regularSliderRating = oRatingWord.ratingData.ratingFieldsetData.nostrCuratedListInstanceRatingFieldsetData.regularSliderRating;
      const confidence = oRatingWord.ratingData.ratingFieldsetData.confidenceFieldsetData.confidence;

      let rater_profilePicUrl = noProfilePicUrl;
      if (oNostrProfilesData[pk_rater]) {
        const oEventProfile = JSON.parse(oNostrProfilesData[pk_rater].event);
        const oProfileContent = JSON.parse(oEventProfile.content);
        if (oProfileContent.picture) {
          rater_profilePicUrl = oProfileContent.picture;
        }
      }
      if (!aEdgesIDs.includes(rating_event_id)) {
        // add rating as another edge
        let title = '';
        title += 'rating: '+regularSliderRating;
        title += '\n confidence: '+confidence;
        const width = 5 * Math.log(regularSliderRating / 10);
        /*
        if (!rater_profilePicUrl) {
          rater_profilePicUrl = noProfilePicUrl
        }
        */
        const oEdge = {
          id: rating_event_id,
          // group: 'ratingOfInstance', // no group styling for edges (I think ???)
          from: pk_rater,
          to: instance_event_id,
          color: {
            color: '#00FF00',
            opacity: 1.0,
          },
          title: title,
          width: width,
          rating: regularSliderRating / 100,
        }
        oResults.aEdges.push(oEdge);
        aEdgesIDs.push(rating_event_id);
      }

      if (!aNodesIDs.includes(instance_event_id)) {
        const oNode = {
          id: instance_event_id,
          group: 'instance',
          title: instance_name,
          label: instance_name,
          name: instance_name,
          scores: JSON.parse(JSON.stringify(iScoresDefault)),
          size: 15,
          afferentEdgeIDs: [],
          physics: false,
          shape: 'diamond',
          // x: 500,
          // y: 100 * aNodesIDs.length - 500,
        }
        oResults.aNodes.push(oNode);
        aNodesIDs.push(instance_event_id);
      }

      if (!aNodesIDs.includes(pk_rater)) {
        // add rater as another rater node
        let oNode = {
          id: pk_rater,
          group: "user",
          shape: 'circularImage',
          image: rater_profilePicUrl,
          brokenImage: noProfilePicUrl,
          title: display_name_rater,
          label: name_rater,
          name: name_rater,
          display_name: display_name_rater,
          afferentEdgeIDs: [],
          seed: false,
          scores: JSON.parse(JSON.stringify(uScoresDefault)),
          size: 50 * uDefaultScores.influence,
        }
        if (pk_rater == myPubKey) {
          oNode.scores = JSON.parse(JSON.stringify(uScoresDefault_seed));
          oNode.seed = true;
          oNode.size = 50;
          oNode.physics = false;
          oNode.x= -200;
          oNode.y = 0;
        }
        oResults.aNodes.push(oNode);
        aNodesIDs.push(pk_rater);
      }
    }
  }

  // adapted from populateEachNodeAfferentEdgeIDs
  for (let e = 0; e < oResults.aEdges.length; e++) {
    const oEdge = oResults.aEdges[e];
    const edgeID = oEdge.id;
    const pk_from = oEdge.from;
    const pk_to = oEdge.to;

    for (let n = 0; n < oResults.aNodes.length; n++) {
      const nodeID = oResults.aNodes[n].id;
      if (nodeID == pk_to) {
        if (!oResults.aNodes[n].afferentEdgeIDs.includes(edgeID)) {
          oResults.aNodes[n].afferentEdgeIDs.push(edgeID);
        }
      }
    }
    /*
    const oNode = nodesLookup[pk_to];
    const { afferentEdgeIDs } = oNode;
    if (!afferentEdgeIDs.includes(edgeID)) {
      afferentEdgeIDs.push(edgeID);
    }
    aNodes[n].afferentEdgeIDs.push(edgeID)
    */

  }

  return oResults;
};
