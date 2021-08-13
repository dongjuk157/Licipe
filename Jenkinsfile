pipeline {
	agent any
	stages {
		stage('Build') {
		steps {
			sh 'ls'
			dir('frontend') {
				sh 'cp -r / ~/dist'
			}
			}
		}

		stage('Start') {
			steps {
				dir('frontend') {
					sh 'ls'
				}
			}
		}
	}
}
