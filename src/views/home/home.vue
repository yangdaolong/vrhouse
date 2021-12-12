<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import { screenPointToThreeCoords } from "@/utils/index";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    this.init();
  },
  methods: {
    init() {
      var scene = new THREE.Scene();
      scene.background = new THREE.Color(0x72645b);

      var camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1;

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.querySelector(".home").appendChild(renderer.domElement);

      var controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const loader = new PLYLoader();
      loader.load("/integrated1.ply", function(geometry) {
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: 0xeeeeee,
          flatShading: true
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.multiplyScalar(1);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);
      });

      (() => {
        var geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        mesh.position.set(0, -2, 0);
      })();
      let box2;
      (() => {
        var geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
        var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        box2 = new THREE.Mesh(geometry, material);
        scene.add(box2);
        box2.position.set(0, -2, 1);
      })();
      // Lights

      scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(0, 1, 0);
      spotLight.angle = Math.PI / 64;
      scene.add(spotLight);

      var spotLightHelper = new THREE.SpotLightHelper(spotLight);
      scene.add(spotLightHelper);

      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();

      function onMouseMove(event) {
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        let p = new THREE.Vector3(-mouse.x, -mouse.y, 0.5).unproject(camera);
        console.log(p);
        spotLight.position.copy(p);
        // spotLight.position.set(-p.x, -p.y, -p.z);
        // spotLight.position.copy(camera.position);
      }

      window.addEventListener("mousemove", onMouseMove, false);

      var animate = function() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    }
  }
};
</script>

<style lang="less" scoped>
.home {
}
</style>
