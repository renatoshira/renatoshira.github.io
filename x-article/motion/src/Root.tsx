import React from 'react';
import {Composition} from 'remotion';
import {V1Weights, V1_FRAMES} from './V1Weights';
import {V3ReachMap, V3_FRAMES} from './V3ReachMap';
import {V4ColdStart, V4_FRAMES} from './V4ColdStart';
import {V5Diversity, V5_FRAMES} from './V5Diversity';
import {V2TwoReaders, V2_FRAMES} from './V2TwoReaders';

const common = {fps: 30, width: 1080, height: 1080};
const pt = {lang: 'pt' as const};

export const Root: React.FC = () => (
  <>
    <Composition id="v1-weights" component={V1Weights} durationInFrames={V1_FRAMES} {...common} />
    <Composition id="v2-two-readers" component={V2TwoReaders} durationInFrames={V2_FRAMES} {...common} />
    <Composition id="v3-reach-map" component={V3ReachMap} durationInFrames={V3_FRAMES} {...common} />
    <Composition id="v4-cold-start" component={V4ColdStart} durationInFrames={V4_FRAMES} {...common} />
    <Composition id="v5-diversity" component={V5Diversity} durationInFrames={V5_FRAMES} {...common} />
    <Composition id="v1-weights-pt" component={V1Weights} durationInFrames={V1_FRAMES} {...common} defaultProps={pt} />
    <Composition id="v2-two-readers-pt" component={V2TwoReaders} durationInFrames={V2_FRAMES} {...common} defaultProps={pt} />
    <Composition id="v3-reach-map-pt" component={V3ReachMap} durationInFrames={V3_FRAMES} {...common} defaultProps={pt} />
    <Composition id="v4-cold-start-pt" component={V4ColdStart} durationInFrames={V4_FRAMES} {...common} defaultProps={pt} />
    <Composition id="v5-diversity-pt" component={V5Diversity} durationInFrames={V5_FRAMES} {...common} defaultProps={pt} />
  </>
);
