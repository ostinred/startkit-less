# StartKit  
### Bootstrap 
#### LESS version

#### 1. clone files
		$ git clone git@github.com:ostinred/startkit-less.git your project name directory

#### 2. enter your new folder
		cd your project name directory

#### 3. install all bower components
		bower install

#### 4. install all grunt modules
		npm install

#### 5. give name for our new project
		Gruntfile.js -> 6. appName:	'YourProjectName',

#### 6. in this command all magic
		grunt init

#### 7. now copy fonts to the directory fonts

#### 8. less\bootstrap\variables.less -> string 44 copy it and give name of your font to variable.
		@font-family:             'Your font';
		@font-family-sans-serif:  @font-family, Helvetica, Arial, sans-serif;

* Attention: 

		Your fonts must have the same names as in the file "less/bootstrap/fonts.less"
		Example: Lato-Regular, Roboto-Regular, Lato-Bold, Roboto-Bold, Lato-Italic, Bold-Italic etc.
		IF NOT: rename there your font-files.

#### 9. copy all our fonts to the dist folder
		grunt copyfont

#### 10. hook up our less-files:

	   a) less\bootstrap\mixins.less
			on the top copy next:
		@import "mixins/media-rules.less";
		@import "mixins/dev-mixins.less";
		@import "dev-extend.less";
	   b) less\bootstrap.less
		on the top copy next:
		@import "dev-variables.less";
		
		before core css copy next:
		@import "fonts.less";

#### 11. deleting some strings:

		a) less\bootstrap.less -> 15. @import "bootstrap/glyphicons.less";
		b) less\font-awesome\font-awesome.less -> 8. @import "path.less";

#### 12. you can work with your new project
		grunt
		grunt watch

#### 13. index.html -> hook up your css and js files

#### 14. after initialize our project before commit do next:
		$ git remote set-url origin 
		an example:
		$ git remote set-url origin git@github.com:etc.git
		after as usual 
		$ git add . 

## 	 Clone this project from existing repository 
		bower install
		npm install
		grunt deleteRepeat /* delete repeat of less srcs files in the bower_components */
		grunt watch