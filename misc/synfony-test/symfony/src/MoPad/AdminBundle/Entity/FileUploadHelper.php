<?php

namespace MoPad\AdminBundle\Entity;

/**
 */
class FileUploadHelper
{
	/**
	 * http://symfony.com/doc/master/reference/forms/types/file.html
	 * http://symfony.com/doc/master/cookbook/doctrine/file_uploads.html
	 * http://blog.code4hire.com/2011/08/symfony2-sonata-admin-bundle-and-file-uploads/
	 */
	protected function getUploadDir()
	{
	    // get rid of the __DIR__ so it doesn't screw when displaying uploaded doc/image in the view.
		return 'uploads/gameimage';
	}
	
	protected function getUploadRootDir($basepath)
	{
	    // the absolute directory path where uploaded documents should be saved
	    return $basepath.$this->getUploadDir();
	}
	
	public function getAbsolutePath($basepath)
	{
		return null === $this->imageName ? null : $this->getUploadRootDir($basepath).'/'.$this->imageName;
	}
	
	public function getWebPath()
	{
	    return null === $this->imageName ? null : $this->getUploadDir().'/'.$this->imageName;
	}
	
	public function upload($basepath, $uploadpath, $file, $filename)
	{
	    // the file property can be empty if the field is not required
	    if (null === $file) {
	        return;
	    }
	   
	    if (null === $basepath) {
	        return;
	    }    
	   
		// move takes the target directory and then the target filename to move to
		$file->move($basepath.$uploadpath, $filename);
	}
	
	public function removeImage($basepath, $uploadpath, $filename)
	{
	    if (null === $basepath) {
	        return;
	    }
		
		if (null === $filename) {
	        return;
	    }
		
	    echo($basepath.$uploadpath.$filename);
		$successful = unlink($basepath.$uploadpath.$filename);
	}
}