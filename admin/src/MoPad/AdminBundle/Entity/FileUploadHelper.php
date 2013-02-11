<?php
/**
 * (C) MoPad
 */
namespace MoPad\AdminBundle\Entity;

/**
 * The FileUploadHelper contains all helpful method to upload, save and delete files.
 * helpful links:
 * {@link http://symfony.com/doc/master/reference/forms/types/file.html},
 * {@link http://symfony.com/doc/master/cookbook/doctrine/file_uploads.html},
 * {@link http://blog.code4hire.com/2011/08/symfony2-sonata-admin-bundle-and-file-uploads/}
 * 
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 * @package MoPad\AdminBundle\Entity
 */
class FileUploadHelper
{
	/**
	 * get rid of the __DIR__ so it doesn't screw when displaying uploaded doc/image in the view.
	 * 
	 * @return get rid of the __DIR__ so it doesn't screw when displaying uploaded doc/image in the view.
	 */
	protected function getUploadDir()
	{
		return 'uploads/gameimage';
	}
	
	/**
	 * the absolute directory path where uploaded documents should be saved
	 * @param $basepath
	 * @return the absolute directory path where uploaded documents should be saved
	 */
	protected function getUploadRootDir($basepath)
	{
	    return $basepath.$this->getUploadDir();
	}
	
	/**
	 * return the absolute path to the file location
	 * @param $basepath
	 * @return the absolute path to the file location
	 */
	public function getAbsolutePath($basepath)
	{
		return null === $this->imageName ? null : $this->getUploadRootDir($basepath).'/'.$this->imageName;
	}
	
	/**
	 * return the full web path to the file location
	 *
	 * @return the full web path to the file location
	 */
	public function getWebPath()
	{
	    return null === $this->imageName ? null : $this->getUploadDir().'/'.$this->imageName;
	}
	
	/**
	 * save a file on local path
	 *
	 * @param String base path
	 * @param String upload path
	 * @param File the file
	 * @param String filename
	 */
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
	
	/**
	 * remove a file from local path
	 *
	 * @param String base path
	 * @param String upload path
	 * @param String filename
	 * 
	 * @return boolean successful
	 */
	public function removeFile($basepath, $uploadpath, $filename)
	{
	    if (null === $basepath) {
	        return;
	    }
		
		if (null === $filename) {
	        return;
	    }
		
	    echo($basepath.$uploadpath.$filename);
		$successful = unlink($basepath.$uploadpath.'/'.$filename);
		return $successful;
	}
}