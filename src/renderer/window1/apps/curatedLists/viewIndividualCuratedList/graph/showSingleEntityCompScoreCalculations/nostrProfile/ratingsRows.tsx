import { nodes, edges } from '../../grapevineVisualization';

const RatingsRows = ({ oNode, pubkey, controlPanelSettings }) => {
  if (!oNode) {
    oNode = {
      scores: {
        thisListCuration_allContexts: {
          defaultScore: {

          }
        }
      }
    };
    oNode.afferentEdgeIDs = [];
  }
  return (
    <>
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          marginBottom: '5px',
          padding: '5px',
          marginLeft: '5px',
          textAlign: 'left',
        }}
      >
        <div className="calculationRowsHeaderContainer">
          <div className="grapevinePageColA">
            rater <span style={{ color: 'yellow' }}>(ratee)</span>
          </div>
          <div className="grapevinePageColB">product</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">rating</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">mod.#1 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">WEIGHT (adjusted)</div>
          <div className="grapevinePageSpacer2Col" />
          <div className="grapevinePageColB">WEIGHT</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">
            rater <span style={{ color: 'yellow' }}>(ratee)</span> influence
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">rating confidence</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">strat. #2 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">mod. #3 coeff.</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">Attenuation Factor</div>
        </div>

        <div style={{ color: 'red' }}>
          {oNode.afferentEdgeIDs.map((edgeID) => {
            const oEdge = edges.get(edgeID);
            const rater_pk = oEdge.from;
            const oRaterNode = nodes.get(rater_pk);

            return (
              <div className="calculationRowContainer">
                <div className="grapevinePageColA">{oRaterNode.display_name}</div>
                <div className="grapevinePageColB">{oEdge.product}</div>
                <div className="grapevinePageSpacer1Col">=</div>
                <div className="grapevinePageColB">{oEdge.rating}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.mod1Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.weightAdjusted}</div>
                <div className="grapevinePageSpacer2Col" />
                <div className="grapevinePageColB">{oEdge.weight}</div>
                <div className="grapevinePageSpacer1Col">=</div>
                <div className="grapevinePageColB">{oEdge.raterInfluence}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">
                {oEdge.ratingConfidence} %
                </div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.strat2Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">{oEdge.mod3Coeff}</div>
                <div className="grapevinePageSpacer1Col">*</div>
                <div className="grapevinePageColB">
                {oEdge.attenuationFactor}
                </div>
              </div>
            );
          })}
        </div>

        <div className="calculationRowContainer">
          <div className="grapevinePageColA">default User Trust Score</div>
          <div className="grapevinePageColB">{oNode.scores.thisListCuration_allContexts.defaultScore.product}</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">
            {controlPanelSettings.defaultUserTrustAverageScore / 100}
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">1</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">{oNode.scores.thisListCuration_allContexts.defaultScore.weightAdjusted}</div>
          <div className="grapevinePageSpacer2Col" />
          <div className="grapevinePageColB">{oNode.scores.thisListCuration_allContexts.defaultScore.weight}</div>
          <div className="grapevinePageSpacer1Col">=</div>
          <div className="grapevinePageColB">(1 by def.)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">
            {controlPanelSettings.defaultUserTrustConfidence}
          </div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">1 (n/a)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">1 (n/a)</div>
          <div className="grapevinePageSpacer1Col">*</div>
          <div className="grapevinePageColB">
            1 (n/a)
          </div>
        </div>



      </div>
    </>
  );
};
export default RatingsRows;
