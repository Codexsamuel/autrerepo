declare module 'three' {
  export * from 'three';
}

declare module 'three-stdlib' {
  export interface GLTF {
    scene: any;
    scenes: any[];
    animations: any[];
    cameras: any[];
    asset: any;
    parser: any;
    userData: any;
  }
}

declare namespace THREE {
  class SkinnedMesh extends Mesh {
    constructor(geometry?: BufferGeometry, material?: Material, useVertexTexture?: boolean);
  }
} 