<template>
  <div ref="canva" id="canva"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
// 1. 创建场景和摄像机
const scene = new THREE.Scene();
// 2、创建摄像机 PerspectiveCamera('视角', '指定投影窗口长宽比', '从距离摄像机多远开始渲染', '截止多远停止渲染100')
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  2,
  1000
);
// 3、创建THREEJs 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 设置渲染器场景大小
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建几何模型 BoxGeometry('x轴', '轴', 'z轴')
const geometry = new THREE.BoxGeometry(2, 2, 2);
// 添加材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格对象
const cube = new THREE.Mesh(geometry, material);
// 添加到场景中去
scene.add(cube);

// 渲染场景
const animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

// 摄影机空间Z轴
camera.position.z = 5;

// 自适应
window.addEventListener("resize", () => {
  // 初始化摄像机
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // 初始化渲染器尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
});
</script>
