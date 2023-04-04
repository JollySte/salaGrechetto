
			//import * as THREE from 'three';
			//import * as TWEEN from './node_modules/@tweenjs/tween.js';

			//const { sRGBEncoding } = require("three");

			
			//import * as THREE from './node_modules/three/build/three.module.js'; 
			//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

			//let request = new XMLHttpRequest();
			//request.open("GET", './animali.json', false);
			//request.send(null);
			//let metadati = JSON.parse(request.responseText);
			const metadati = await (await fetch('./animali.json')).json();
			const nomiC = [...new Set(metadati.map(item => item.nomeComune))]; 
			nomiC.sort();
			//console.log(nomiC);
			const nomiS = [...new Set(metadati.map(item => item.nomeScientifico))]; 
			nomiS.sort();
			//console.log(nomiS);
			

			const containerScena = document.getElementById('scena');
			const containerCanvas = document.createElement('canvas');
			const scene = new THREE.Scene();
			const loader = new THREE.OBJLoader();
			loader.setPath('./sala/');
			const textureLoader = new THREE.TextureLoader();
			const camera = new THREE.PerspectiveCamera( 50, 1460 / 766, 0.5, 9000 );
			camera.position.set(-239, -187, 5000);
			//let dire = new THREE.Vector3(-1000, 2000, -520);
			//camera.lookAt(-1000, 0, -550);
			camera.updateProjectionMatrix();
			const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.8);
			scene.add(ambientLight);
			const light1 = new THREE.PointLight( 0xffffff, 0.14, 8000 ); 
			light1.position.set(-217, 1000, 1300);
			scene.add( light1 );
			
			let containerWidth = containerScena.clientWidth;
    		let containerHeight = containerScena.clientHeight;
			
			
			const renderer = new THREE.WebGLRenderer( {canvas: containerScena, antialias: true } );
			renderer.setSize(containerWidth, containerHeight);	
			renderer.setClearColor(0xAAAAAA);
			renderer.setPixelRatio( window.devicePixelRatio );
		//	document.body.appendChild( containerScena );
			//containerScena.appendChild(renderer.domElement);

			// sistema quando si ridimensiona la finestra
						
			function onWindowResize() {
							
				console.log("client: ", containerWidth, containerHeight);
				
					renderer.setSize( containerWidth, containerHeight );
					camera.aspect = containerWidth / containerHeight;
					camera.updateProjectionMatrix();
				};

			window.addEventListener( 'resize', onWindowResize );
			
			THREE.ColorManagement.enabled = true;

			const zPaint = -520;
			const pav = new THREE.Group();
			const parete1 = new THREE.Group();
			const parete2 = new THREE.Group();
			const parete3 = new THREE.Group();
			const parete4 = new THREE.Group();
			// caricamento di un obj 
			function caricaObj(urlOggetto, gruppo, posx, posy, posz, scalex, scaley, scalez){
				loader.load(
					// resource URL
					urlOggetto,
					// called when resource is loaded
					function ( object ) {
						object.position.x += posx;
						object.position.y += posy;
						object.position.z += posz;
						object.scale.x *= scalex;
						object.scale.y *= scaley;
						object.scale.z *= scalez;
						gruppo.add(object);
						
					},
					// called when loading is in progresses
					function ( xhr ) {
	
						console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
					},
					// called when loading has errors
					function ( error ) {
	
						console.log( 'An error happened' );
	
					}
				);
			}

			caricaObj('pavimento.obj', pav, -200, -1010, 1400, 480, 480, 1400);

			caricaObj('tetto.obj', parete1, -1197, 940, 25, 1310, 500, 500);

			caricaObj('zoccolo.obj', parete1, -2329, -1005, 25, 73, 290, 200);
			
			caricaObj('door_2.obj', parete1, -1937, -1000, 25, 500, 500, 200);

			caricaObj('zoccolo.obj', parete1, -812, -1005, 25, 810, 290, 200);

			caricaObj('zoccolo.obj', parete2, 678, -1005, 25, 673, 291, 200);
			
			caricaObj('door_2.obj', parete2, 1666, -1000, 25, 500, 517, 200);

			caricaObj('zoccolo.obj', parete2, 2700, -1005, 25, 720, 291, 200);

			caricaObj('tetto.obj', parete2, 1713, 940, 25, 1862, 500, 500);

			caricaObj('zoccolo.obj', parete3, 763, -1005, 25, 759, 291, 200);

			caricaObj('door_2.obj', parete3, 1840, -1000, 25, 500, 517, 200);

			caricaObj('zoccolo.obj', parete3, 2219, -1005, 25, 66, 291, 200);

			caricaObj('tetto.obj', parete3, 1140, 940, 25, 1248, 500, 500);

			caricaObj('zoccolo.obj', parete4, 351, -1005, 25, 340, 291, 200);

			caricaObj('door_big.obj', parete4, 1061, -1000, 25, 370, 410, 200);

			caricaObj('zoccolo.obj', parete4, 1575, -1005, 25, 146, 291, 200);

			caricaObj('door_big.obj', parete4, 2091, -1000, 25, 370, 410, 200);

			caricaObj('zoccolo.obj', parete4, 2606, -1005, 25, 146, 291, 200);

			caricaObj('door_big.obj', parete4, 3130, -1000, 25, 370, 410, 200);

			caricaObj('zoccolo.obj', parete4, 3624, -1005, 25, 144, 291, 200);

			caricaObj('tetto.obj', parete4, 1894, 940, 25, 2060, 500, 500);

			scene.add(pav);

			const pavgeometry = new THREE.PlaneGeometry( 2550, 4150 );
			const materialpav = new THREE.MeshBasicMaterial( {color: 0xffffff } );
			const pavimento = new THREE.Mesh( pavgeometry, materialpav );
			//scene.add( pavimento );
			pavimento.rotation.x = -0.5 * Math.PI;
			pavimento.position.x = -275;
			pavimento.position.y = -1010;
			pavimento.position.z = 1480;
			//pavimento.position.z = 1.5;
			
			const texDataA = [];
			

			const texture0102 =  await textureLoader.loadAsync('./sala/01_02.jpg');
    		const material0102 = new THREE.MeshBasicMaterial({ map: texture0102 });
    		const wall0102geo = new THREE.PlaneGeometry(texture0102.image.width/4, texture0102.image.height/4);
    		const wall0102 = new THREE.Mesh(wall0102geo, material0102);
			wall0102.name = 'A';
			wall0102.userData.index = 0;
			wall0102.position.x = -2005;
			wall0102.position.y = 550;			
			parete1.add(wall0102);

			const texture0102b = textureLoader.load( './sala/01_02.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'A';
				canvas.width = texture.image.width/4;
				canvas.height = texture.image.height/4;
				
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/4, texture.image.height/4);
				texDataA[0] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture01l02l =  await textureLoader.loadAsync('./sala/01L_02L.jpg');
    		const material01l02l = new THREE.MeshBasicMaterial({ map: texture01l02l });
    		const wall01l02lgeo = new THREE.PlaneGeometry(texture01l02l.image.width/4, texture01l02l.image.height/4);
    		const wall01l02l = new THREE.Mesh(wall01l02lgeo, material01l02l);
			wall01l02l.position.x = -2327;
			wall01l02l.position.y = -182;
			wall01l02l.scale.x += 0.13;
			parete1.add(wall01l02l);
			
			
			const texture0207 =  await textureLoader.loadAsync('./sala/02_07.jpg');
    		const material0207 = new THREE.MeshBasicMaterial({ map: texture0207 });
    		const wall0207geo = new THREE.PlaneGeometry(texture0207.image.width/3, texture0207.image.height/3);
    		const wall0207 = new THREE.Mesh(wall0207geo, material0207);
			wall0207.name = 'B';
			wall0207.userData.index = 1;
			wall0207.position.x = -1298;
			wall0207.position.y = 265;
			parete1.add(wall0207);

			const texture0207b = textureLoader.load( './sala/02_07.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'B';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;
				
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[1] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0305 =  await textureLoader.loadAsync('./sala/03_05.jpg');
    		const material0305 = new THREE.MeshBasicMaterial({ map: texture0305 });
    		const wall0305geo = new THREE.PlaneGeometry(texture0305.image.width/3, texture0305.image.height/3);
    		const wall0305 = new THREE.Mesh(wall0305geo, material0305);
			wall0305.name = 'C';
			wall0305.userData.index = 2;
			wall0305.position.x = -487;
			wall0305.position.y = 265;
			parete1.add(wall0305);

			const texture0305b = textureLoader.load( './sala/03_05.png', ( texture ) => {
			
				
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'C';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;
				
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[2] = context.getImageData( 0, 0, canvas.width, canvas.height );
				
			});

			const texture0401 =  await textureLoader.loadAsync('./sala/04_01.jpg');
    		const material0401 = new THREE.MeshBasicMaterial({ map: texture0401 });
    		const wall0401geo = new THREE.PlaneGeometry(texture0401.image.width/3, texture0401.image.height/3);
    		const wall0401 = new THREE.Mesh(wall0401geo, material0401);
			wall0401.name = 'D';
			wall0401.userData.index = 3;
			wall0401.position.x = 344;
			wall0401.position.y = 265;
			parete2.add(wall0401);

			const texture0401b = textureLoader.load( './sala/04_01.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'D';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;				
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[3] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})
	

			const texture0511 =  await textureLoader.loadAsync('./sala/05_11.jpg');
    		const material0511 = new THREE.MeshBasicMaterial({ map: texture0511 });
    		const wall0511geo = new THREE.PlaneGeometry(texture0511.image.width/3, texture0511.image.height/3);
    		const wall0511 = new THREE.Mesh(wall0511geo, material0511);
			wall0511.name = 'E';
			wall0511.userData.index = 4;
			wall0511.position.x = 1019;
			wall0511.position.y = 265;
			parete2.add(wall0511);

			const texture0511b = textureLoader.load( './sala/05_11.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'E';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;		
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[4] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0612 =  await textureLoader.loadAsync('./sala/06_12.jpg');
    		const material0612 = new THREE.MeshBasicMaterial({ map: texture0612 });
    		const wall0612geo = new THREE.PlaneGeometry(texture0612.image.width/4.1, texture0612.image.height/4.3);
    		const wall0612 = new THREE.Mesh(wall0612geo, material0612);
			wall0612.name = 'F';
			wall0612.userData.index = 5;
			wall0612.position.x = 1668;
			wall0612.position.y = 569;
			parete2.add(wall0612);

			const texture0612b = textureLoader.load( './sala/06_12.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'F';
				canvas.width = texture.image.width/4.1;
				canvas.height = texture.image.height/4.1;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/4.1, texture.image.height/4.1);
				texDataA[5] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0704 =  await textureLoader.loadAsync('./sala/07_04.jpg');
    		const material0704 = new THREE.MeshBasicMaterial({ map: texture0704 });
    		const wall0704geo = new THREE.PlaneGeometry(texture0704.image.width/3, texture0704.image.height/3);
    		const wall0704 = new THREE.Mesh(wall0704geo, material0704);
			wall0704.name = 'G';
			wall0704.userData.index = 6;
			wall0704.position.x = 2348;
			wall0704.position.y = 265;
			parete2.add(wall0704);

			const texture0704b = textureLoader.load( './sala/07_04.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'G';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[6] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0809 =  await textureLoader.loadAsync('./sala/08_09.jpg');
    		const material0809 = new THREE.MeshBasicMaterial({ map: texture0809 });
    		const wall0809geo = new THREE.PlaneGeometry(texture0809.image.width/3, texture0809.image.height/3);
    		const wall0809 = new THREE.Mesh(wall0809geo, material0809);
			wall0809.name = 'H';
			wall0809.userData.index = 7;
			wall0809.position.x = 3065;
			wall0809.position.y = 265;
			parete2.add(wall0809);

			const texture0809b = textureLoader.load( './sala/08_09.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'H';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[7] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0906 =  await textureLoader.loadAsync('./sala/09_06.jpg');
    		const material0906 = new THREE.MeshBasicMaterial({ map: texture0906 });
    		const wall0906geo = new THREE.PlaneGeometry(texture0906.image.width/2.98, texture0906.image.height/3);
    		const wall0906 = new THREE.Mesh(wall0906geo, material0906);
			wall0906.name = 'I';
			wall0906.userData.index = 8;
			wall0906.position.x = 435;
			wall0906.position.y = 265;
			parete3.add(wall0906);

			const texture0906b = textureLoader.load( './sala/09_06.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'I';
				canvas.width = texture.image.width/2.98;
				canvas.height = texture.image.height/3;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/2.98, texture.image.height/3);
				texDataA[8] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1003 =  await textureLoader.loadAsync('./sala/10_03.jpg');
    		const material1003 = new THREE.MeshBasicMaterial({ map: texture1003 });
    		const wall1003geo = new THREE.PlaneGeometry(texture1003.image.width/3, texture1003.image.height/3);
    		const wall1003 = new THREE.Mesh(wall1003geo, material1003);
			wall1003.name = 'J';
			wall1003.userData.index = 9;
			wall1003.position.x = 1339;
			wall1003.position.y = 265;
			parete3.add(wall1003);

			const texture1003b = textureLoader.load( './sala/10_03.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'J';
				canvas.width = texture.image.width/3;
				canvas.height = texture.image.height/3;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3, texture.image.height/3);
				texDataA[9] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1116 =  await textureLoader.loadAsync('./sala/11_16.jpg');
    		const material1116 = new THREE.MeshBasicMaterial({ map: texture1116 });
    		const wall1116geo = new THREE.PlaneGeometry(texture1116.image.width/3.5, texture1116.image.height/4.13);
    		const wall1116 = new THREE.Mesh(wall1116geo, material1116);
			wall1116.name = 'K';
			wall1116.userData.index = 10;
			wall1116.position.x = 2038;
			wall1116.position.y = 565;
			parete3.add(wall1116);

			const texture1116b = textureLoader.load( './sala/11_16.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'K';
				canvas.width = texture.image.width/3.5;
				canvas.height = texture.image.height/4.13;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.5, texture.image.height/4.13);
				texDataA[10] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1116r =  await textureLoader.loadAsync('./sala/11R_16R.jpg');
    		const material1116r = new THREE.MeshBasicMaterial({ map: texture1116r });
    		const wall1116rgeo = new THREE.PlaneGeometry(texture1116r.image.width/3.86, texture1116r.image.height/4.2);
    		const wall1116r = new THREE.Mesh(wall1116rgeo, material1116r);
			wall1116r.name = 'L';
			wall1116r.userData.index = 11;
			wall1116r.position.x = 2215;
			wall1116r.position.y = -117;
			parete3.add(wall1116r);

			const texture1116rb = textureLoader.load( './sala/11R_16R.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'L';
				canvas.width = texture.image.width/3.86;
				canvas.height = texture.image.height/4.2;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.86, texture.image.height/4.2);
				texDataA[11] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1208 =  await textureLoader.loadAsync('./sala/12_08.jpg');
    		const material1208 = new THREE.MeshBasicMaterial({ map: texture1208 });
    		const wall1208geo = new THREE.PlaneGeometry(texture1208.image.width/4, texture1208.image.height/3.8);
    		const wall1208 = new THREE.Mesh(wall1208geo, material1208);
			wall1208.name = 'M';
			wall1208.userData.index = 12;
			wall1208.position.x = 346;
			wall1208.position.y = 418;
			parete4.add(wall1208);

			const texture1208b = textureLoader.load( './sala/12_08.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'M';
				canvas.width = texture.image.width/4;
				canvas.height = texture.image.height/3.8;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/4, texture.image.height/3.8);
				texDataA[12] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture0612c =  await textureLoader.loadAsync('./sala/06C_12C.jpg');
    		const material0612c = new THREE.MeshBasicMaterial({ map: texture0612c });
    		const wall0612cgeo = new THREE.PlaneGeometry(texture0612c.image.width/3.96, texture0612c.image.height/5.43);
    		const wall0612c = new THREE.Mesh(wall0612cgeo, material0612c);
			wall0612c.position.x = 346;
			wall0612c.position.y = -268;
			parete4.add(wall0612c);

			const texture1314 =  await textureLoader.loadAsync('./sala/13_14.jpg');
    		const material1314 = new THREE.MeshBasicMaterial({ map: texture1314 });
    		const wall1314geo = new THREE.PlaneGeometry(texture1314.image.width/3.3, texture1314.image.height/3.5);
    		const wall1314 = new THREE.Mesh(wall1314geo, material1314);
			wall1314.name = 'N';
			wall1314.userData.index = 13;
			wall1314.position.x = 1282;
			wall1314.position.y = 695;
			parete4.add(wall1314);

			const texture1314b = textureLoader.load( './sala/13_14.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'N';
				canvas.width = texture.image.width/3.3;
				canvas.height = texture.image.height/3.5;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.3, texture.image.height/3.5);
				texDataA[13] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1314r =  await textureLoader.loadAsync('./sala/13R_14R.jpg');
    		const material1314r = new THREE.MeshBasicMaterial({ map: texture1314r });
    		const wall1314rgeo = new THREE.PlaneGeometry(texture1314r.image.width/4, texture1314r.image.height/4.08);
    		const wall1314r = new THREE.Mesh(wall1314rgeo, material1314r);
			wall1314r.name = 'O';
			wall1314r.userData.index = 14;
			wall1314r.position.x = 1576;
			wall1314r.position.y = 14;
			parete4.add(wall1314r);

			const texture1314rb = textureLoader.load( './sala/13R_14R.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'O';
				canvas.width = texture.image.width/4;
				canvas.height = texture.image.height/4.08;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/4, texture.image.height/4.08);
				texDataA[14] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1415 =  await textureLoader.loadAsync('./sala/14_15.jpg');
    		const material1415 = new THREE.MeshBasicMaterial({ map: texture1415 });
    		const wall1415geo = new THREE.PlaneGeometry(texture1415.image.width/3.42, texture1415.image.height/3.37);
    		const wall1415 = new THREE.Mesh(wall1415geo, material1415);
			wall1415.name = 'P';
			wall1415.userData.index = 15;
			wall1415.position.x = 2402;
			wall1415.position.y = 698;
			parete4.add(wall1415);

			const texture1415b = textureLoader.load( './sala/14_15.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'P';
				canvas.width = texture.image.width/3.42;
				canvas.height = texture.image.height/3.37;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.42, texture.image.height/3.37);
				texDataA[15] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1415r =  await textureLoader.loadAsync('./sala/14R_15R.jpg');
    		const material1415r = new THREE.MeshBasicMaterial({ map: texture1415r });
    		const wall1415rgeo = new THREE.PlaneGeometry(texture1415r.image.width/3.6, texture1415r.image.height/3.87);
    		const wall1415r = new THREE.Mesh(wall1415rgeo, material1415r);
			wall1415r.name = 'Q';
			wall1415r.userData.index = 16;
			wall1415r.position.x = 2610;
			wall1415r.position.y = 11;
			parete4.add(wall1415r);

			const texture1415rb = textureLoader.load( './sala/14R_15R.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'Q';
				canvas.width = texture.image.width/3.6;
				canvas.height = texture.image.height/3.87;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.6, texture.image.height/3.87);
				texDataA[16] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1513 =  await textureLoader.loadAsync('./sala/15_13.jpg');
    		const material1513 = new THREE.MeshBasicMaterial({ map: texture1513 });
    		const wall1513geo = new THREE.PlaneGeometry(texture1513.image.width/4.11, texture1513.image.height/3.48);
    		const wall1513 = new THREE.Mesh(wall1513geo, material1513);
			wall1513.name = 'R';
			wall1513.userData.index = 17;
			wall1513.position.x = 3356;
			wall1513.position.y = 697;
			parete4.add(wall1513);

			const texture1513b = textureLoader.load( './sala/15_13.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'R';
				canvas.width = texture.image.width/4.11;
				canvas.height = texture.image.height/3.48;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/4.11, texture.image.height/3.48);
				texDataA[17] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})

			const texture1513r =  await textureLoader.loadAsync('./sala/15R_13R.jpg');
    		const material1513r = new THREE.MeshBasicMaterial({ map: texture1513r });
    		const wall1513rgeo = new THREE.PlaneGeometry(texture1513r.image.width/3.91, texture1513r.image.height/4.03);
    		const wall1513r = new THREE.Mesh(wall1513rgeo, material1513r);
			wall1513r.name = 'S';
			wall1513r.userData.index = 18;
			wall1513r.position.x = 3640;
			wall1513r.position.y = 10;
			parete4.add(wall1513r);

			const texture1513rb = textureLoader.load( './sala/15R_13R.png', ( texture ) => {
			
				const canvas = document.createElement( 'canvas' );
				canvas.id = 'S';
				canvas.width = texture.image.width/3.91;
				canvas.height = texture.image.height/4.03;
				const context = canvas.getContext( '2d' );
				context.drawImage( texture.image, 0, 0, texture.image.width/3.91, texture.image.height/4.03);
				texDataA[18] = context.getImageData( 0, 0, canvas.width, canvas.height );
			})


			

			parete4.position.set(-1350, 0, 3260);
			parete4.rotateY(0.5 * Math.PI);
			parete3.position.set(927, 0, 3243);
			//parete3.add(parete4);
			parete3.rotateY(-1 * Math.PI);
			parete2.position.set(937, 0, -520);
			parete2.scale.x = 1.1;
			//parete2.add(parete3);
			parete2.rotateY(-0.5 * Math.PI);
			parete1.position.set(937, 0, -520);
			//parete1.rotateY(-0.01 * Math.PI);
			parete1.scale.x = 0.956;

			scene.add(parete1);
			scene.add(parete2);
			scene.add(parete3);
			scene.add(parete4);
			const orbit = new THREE.OrbitControls(camera, renderer.domElement);
			orbit.minDistance = 30;
			orbit.maxDistance = 1000;
			orbit.target.set(-100, 0, 1400);
			//orbit.enablePan = false;
			orbit.update();
			//orbit.enableDamping = true;
			/*const controls = new THREE.PointerLockControls(camera, containerScena);
			document.body.addEventListener( 'click', function () {
				//lock mouse on screen
				controls.lock();
			}, false );
			*/
			let lerping = false;
			
			const spheregeo = new THREE.SphereGeometry(32,48,32);
       		const sphereMaterial = new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 0.4});
        	const sphere1 = new THREE.Mesh(spheregeo, sphereMaterial);
        	sphere1.position.set(-100, 0, 350);
			sphere1.userData.draggable = true;
			sphere1.userData.selected = false;
        	scene.add(sphere1);
			const sphere2 = sphere1.clone();
			sphere2.material = new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 0.4});
        	sphere2.position.set(-100, 0, 2400);
			sphere2.userData.draggable = true;
			sphere2.userData.selected = false;
        	scene.add(sphere2);
		
			const sphereCenter = sphere1.clone();
        	sphereCenter.position.set(-100, 0, 1400);
			sphereCenter.material = new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 0.0});
			sphereCenter.userData.draggable = true;
			sphereCenter.userData.selected = false;
        	scene.add(sphereCenter);


			const sfereView = [sphere1, sphereCenter, sphere2];

			let lastSfera = sphereCenter.clone();
					

			// raycasting per tracciare il movimento del mouse 
			const pointer = new THREE.Vector2();
			const clickPos = new THREE.Vector2();
			const raycaster = new THREE.Raycaster();
			let direction = new THREE.Vector3();
			let camPosition = [-714, 760, -65];
			let camDirection = new THREE.Vector3(-761, 785, -520);
			var sfera = THREE.Object3D;
			console.log(metadati[0]);
			
			function onMouseMove(event){
				let box = renderer.domElement.getBoundingClientRect();
				pointer.x = (event.offsetX / renderer.domElement.width) * 2 - 1;
				pointer.y = -(event.offsetY / renderer.domElement.height) * 2 + 1;
			}

			function onRightClick(event){
				event.preventDefault();
				posTarget = lastSfera.position;
				//orbit.enabled = true;
			}
			

			function onMouseClick(event){
				event.preventDefault();
				let box = renderer.domElement.getBoundingClientRect();
				clickPos.x = (event.offsetX / renderer.domElement.width) * 2 - 1;
				clickPos.y = -(event.offsetY / renderer.domElement.height) * 2 + 1;

				raycaster.setFromCamera(clickPos, camera);
				const intersects = raycaster.intersectObjects(scene.children);
				console.log("info: ", intersects[0]);

				// get pixel coordinates on texture
			
				


				sfera = intersects[0].object;
				if(intersects.length > 0 && sfera.userData.draggable){
					for(let i = 0; i<sfereView.length; i++){
						sfereView[i].material.opacity = 0.4;
					}
					sfera = intersects[0].object;
					lastSfera = sfera;
					sfera.userData.selected = true;
					sfera.material.opacity = 0;
				//	console.log("camera: ");
				//	console.log(camera.position.x, camera.position.y, camera.position.z);
				//	console.log("sferapos: ");
				//	console.log(sfera.position.x, sfera.position.y, sfera.position.z);
					posTarget = sfera.position;
					//orbit.target.set(sfera.position.x, sfera.position.y, sfera.position.z);
					//orbit.update();
					//orbit.current.target.lerp
					//zoom(camPosition, camDirection);
				}
				
			}
			let direzioneLook = new THREE.Vector3();
			containerScena.addEventListener('mousemove', onMouseMove);
			containerScena.addEventListener('dblclick', onMouseClick);
			containerScena.addEventListener('contextmenu', onRightClick);
			//let posPartenza = camera.position;
			let posTarget = camera.position;
			let lookPartenza = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);			
			let lookTarget = camera.getWorldDirection(direzioneLook);
			
				
			function zoom(posizione, direzione){
				//posPartenza = camera.position;
				posTarget = new THREE.Vector3(posizione[0], posizione[1], posizione[2]);
				lookPartenza = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);			
				lookTarget = direzione;

				lerping = true;
				
				
				/*
				TWEEN.removeAll();
				orbit.enabled = false;
				let vec = new THREE.Vector3(posizione[0], posizione[1], posizione[2]);
				new TWEEN.Tween(camera.position)
					.to(vec, 2000)
					.onUpdate(() => {
						camera.lookAt(direzione);
					}).onComplete(() => {
					
						orbit.enabled = true;
					})
					.start();
					*/

					
			}


			

				containerScena.addEventListener( 'dblclick', (event) => {
					const raycaster = new THREE.Raycaster();
					const mouse = new THREE.Vector2();
					
					// check intersections with imported model
			
					mouse.x =  (event.offsetX / renderer.domElement.width) * 2 - 1;
					mouse.y =  -(event.offsetY / renderer.domElement.height) * 2 + 1;

					raycaster.setFromCamera( mouse, camera );
			
					const intersects = raycaster.intersectObjects( scene.children );
			
					// if there is any intersection, continue

			
					if ( intersects.length && intersects[0].uv ) {
					//	console.log("obj.name: ", intersects[0].object.name);
						//const textureCanvas = document.getElementById(`${intersects[0].object.name}`);
						//console.log("textureCanvas: ", textureCanvas);
						//const context = textureCanvas.getContext( '2d' );
					//	console.log("index: ", intersects[0].object.userData.index);
						const texData = texDataA[intersects[0].object.userData.index];
						const uv = intersects[0].uv;			
					//	console.log("texdata: ", texData);
						var tx = Math.min(uv.x * texData.width  | 0, texData.width - 1);
						var ty = Math.min(uv.y * texData.height | 0, texData.height - 1);
						ty = texData.height - ty;
						var offset = (ty * texData.width + tx) * 4;
						var r = texData.data[offset + 0];
						var g = texData.data[offset + 1];
						var b = texData.data[offset + 2];
						var a = texData.data[offset + 3];

						console.log("color: ", r, g, b, a );
						let animale = trovaByColor(r, g, b);
						riempiCampi(animale);
						console.log("animale: ", animale);
				}
			});
			
	

			/*
			function spostaSfera(){
				if(sfera != null){
					raycaster.setFromCamera(pointer, camera);
					const intersects = raycaster.intersectObjects(scene.children);
					if(intersects.length > 0 && intersects[0].object.userData.draggable){
						for (let o of intersects){
							
							sfera.position.x = o.point.x;
							sfera.position.y = o.point.y;
						}
					}
				}
			}
			*/
			
			let trovati = [];
			let currentObj = null;
			//let index = 0;

			function trovaFromNomeC(){
				resetStars();
				let sel = document.getElementById('nomeC');
				let nome = sel.options[sel.selectedIndex].text;

				if(trovati.length>0 && trovati[0].nomeComune == nome){
					
					if(currentObj == null){
						currentObj = trovati[0];
					}
					insertNomeS(currentObj.nomeScientifico);
					document.getElementById('areaGeo').innerHTML = currentObj.areaGeo;
					document.getElementById('classeRazza').value = currentObj.classe;
					document.getElementById('descrizione').innerHTML = currentObj.note;
					insertStars(currentObj.affidabilita);
					let dir = currentObj.lookAt;
					let vec = new THREE.Vector3(dir[0], dir[1], dir[2]);
					zoom(currentObj.camera, vec);
				}
				else{
					resetButtons();

					trovati = metadati.filter((item) => item.nomeComune == nome);
					//console.log(trovati);

					currentObj = trovati[0];
					insertNomeS(currentObj.nomeScientifico);

					if(currentObj.areaGeo !== undefined){
						document.getElementById('areaGeo').innerHTML = currentObj.areaGeo;
					}else{
						document.getElementById('areaGeo').innerHTML = "";
					}

					document.getElementById('classeRazza').value = currentObj.classe;

					if(currentObj.note !== undefined){
						document.getElementById('descrizione').innerHTML = currentObj.note;
					}else{
						document.getElementById('descrizione').innerHTML = "";
					}	
					insertStars(currentObj.affidabilita);
					document.getElementById('esemplari').innerHTML = "Esemplari di " + nome + " nella sala:";
					let dir = currentObj.lookAt;
					let vec = new THREE.Vector3(dir[0], dir[1], dir[2]);
					zoom(currentObj.camera, vec);
					let altri = document.getElementById('altri');
					for(let i = 0; i < trovati.length; i++){
						let x = document.createElement('button');
						x.id = i;
						x.innerHTML = i+1;
						x.onclick = function(){
							riempiCampi(trovati[i]);
						};
						altri.appendChild(x);
					}
				}

			}

			function trovaByColor(r, g, b){
					for(let i = 0; i < metadati.length; i++){
						let a = metadati[i];
						if(a.rgb && a.rgb[0] == r && a.rgb[1] == g && a.rgb[2] == b)
							return a;
					}
					
				}

			function riempiCampi(animale){
					
					if(currentObj != animale){
					{
						resetStars();
						resetButtons();
	
						//console.log(trovati);
	
						currentObj = animale;
						if(typeof currentObj.nomeComune !== undefined){
							insertNomeC(currentObj.nomeComune);
						}

						if(typeof currentObj.nomeScientifico !== undefined){
							insertNomeS(currentObj.nomeScientifico);
						}
	
						if(typeof currentObj.areaGeo !== undefined){
							document.getElementById('areaGeo').innerHTML = currentObj.areaGeo;
						}else{
							document.getElementById('areaGeo').innerHTML = "";
						}
	
						document.getElementById('classeRazza').value = currentObj.classe;
	
						if(currentObj.note !== undefined){
							document.getElementById('descrizione').innerHTML = currentObj.note;
						}else{
							document.getElementById('descrizione').innerHTML = "";
						}	
						insertStars(currentObj.affidabilita);
						document.getElementById('esemplari').innerHTML = "Esemplari di " + currentObj.nomeComune + " nella sala:";
						let dir = currentObj.lookAt;
						let vec = new THREE.Vector3(dir[0], dir[1], dir[2]);
						zoom(currentObj.camera, vec);
						let altri = document.getElementById('altri');
						for(let i = 0; i < trovati.length; i++){
							let x = document.createElement('button');
							x.id = i;
							x.innerHTML = i+1;
							x.onclick = function(){
								riempiCampi(trovati[i]);
							};
							altri.appendChild(x);
						}
					}
				}
	
			}

			

			document.getElementById('nomeC').addEventListener('change', trovaFromNomeC);
			//document.getElementById('nomeS').addEventListener('change', trovaFromNomeS);


			function insertButtons(){
				for(let i = 0; i < trovati.length; i++){
					let x = document.createElement('button');
					x.id = i;
					x.innerHTML = i+1;
					x.addEventListener('click', function(){
						currentObj = trovati[i];
					} );
					altri.appendChild(x);
				}
			}

			function resetButtons(){
				let div = document.getElementById("altri");
				while(div.firstChild){
					div.removeChild(div.firstChild);
				}
			}

			function insertNomeS(nome){
				if(typeof nome !== undefined){
					document.getElementById('nomeS').value = currentObj.nomeScientifico;
				}else{
					document.getElementById('nomeS').value = "";
				}
			}

			function insertNomeC(nome){
				if(typeof nome !== undefined){
					document.getElementById('nomeC').value = currentObj.nomeComune;
				}else{
					document.getElementById('nomeC').value = "";
				}
			}

			function insertNames(){
				const selectorNomeC = document.getElementById("nomeC");
				for(let i = 0; i < nomiC.length; i++){
					let x = document.createElement('option');
					x.text = nomiC[i];
					x.value = nomiC[i];
					selectorNomeC.add(x);
				}
				const selectorNomeS = document.getElementById("nomeS");
				for(let i = 0; i < nomiS.length; i++){
					let x = document.createElement('option');
					if(nomiS[i] !== undefined){
						x.text = nomiS[i];
						x.value = nomiS[i];
						selectorNomeS.add(x);
					}
				}
			}

			function insertStars(quality){
				const stars = document.getElementById("qualita");
				switch(quality){
					case "Buona": 
						for(let i=0; i < 3; i++){
						let x = document.createElement('span');
						x.className = "fa fa-star checked";
						stars.appendChild(x);
						}
						break;
					case "Media":
					{
						for(let i=0; i < 2; i++){
							let x = document.createElement('span');
							x.className = "fa fa-star checked";
							stars.appendChild(x);
							}
						let x = document.createElement('span');
						x.className = "fa fa-star";
						stars.appendChild(x);
						break;
					}
					case "Scarsa":
						{
						let x = document.createElement('span');
						x.className = "fa fa-star checked";
						stars.appendChild(x);
						for(let i=0; i < 2; i++){
							let x = document.createElement('span');
							x.className = "fa fa-star";
							stars.appendChild(x);
							}
						}
						break;
					default: 
						for(let i=0; i < 3; i++){
							let x = document.createElement('span');
							x.className = "fa fa-star";
							stars.appendChild(x);
							}
						break;
				}
			}

			function resetStars(){
				const div = document.getElementById("qualita");
				while(div.firstChild){
					div.removeChild(div.firstChild);
				}
			}
			
			insertNames();
			
			function animate() {
				requestAnimationFrame( animate );
				//spostaSfera();
				//TWEEN.update();
				renderer.render( scene, camera );
				if(lerping){
					orbit.target.lerp(posTarget, 0.04);
					orbit.update();
				//	orbit.target.set(posTarget);
				//	camera.position.lerp(posTarget, 0.04);			
					lookPartenza.lerp(lookTarget, 0.04);

					//camera.lookAt(lookPartenza);
				}
				if(camera.position.distanceTo(posTarget) <= 0.05){
					orbit.enabled = true;
					orbit.update();
				}
				//lookPartenza.lerp(lookTarget, 0.05);
				//controls.update();				
			};
			animate();
		