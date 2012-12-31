<?php

namespace MoPad\AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Game
 * @ORM\Entity
 * @ORM\Table(name="game")
 * @ORM\Entity(repositoryClass="MoPad\AdminBundle\Entity\GameRepository")
 * 
 * * Update Game Entity Getter/Setter
 * - $ php app/console doctrine:generate:entities MoPadAdminBundle
 * * Update database schema/tables
 * - $ php app/console doctrine:schema:update --force
 */
class Game
{
    /**
     * @var integer
	 * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
	 * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @var string
	 * @ORM\Column(type="text")
     */
    private $description;
	
	/**
     * @var string
	 * @ORM\Column(type="string", length=255)
     */
    private $apiKey;
	
	/**
     * @var string
	 * @ORM\Column(type="string", length=255)
     */
    private $vendor;
	
	/**
     * @var boolean
	 * @ORM\Column(type="boolean")
     */
    private $activated = false;
	
	/**
	 * @var integer
	 * @ORM\Column(type="integer")
	 */
	private $minPlayer = 1;
	/**
	 * @var integer
	 * @ORM\Column(type="integer")
	 */
	private $maxPlayer = 10;
	
	/**
     * @var string
	 * @ORM\Column(type="string")
     */
    private $acceptedGamePads;
	
	/**
	 * no database safety, local safe
	 */
	private $image;
	
	/**
	 * @var string
	 * @ORM\Column(type="string", length=255)
	 */
	private $imageName = "";

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Product
     */
    public function setName($name)
    {
        $this->name = $name;
    
        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Product
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }
	
    /**
     * Set apiKey
     *
     * @param string $apiKey
     * @return Game
     */
    public function setApiKey($apiKey)
    {
        $this->apiKey = $apiKey;
    
        return $this;
    }

    /**
     * Get apiKey
     *
     * @return string 
     */
    public function getApiKey()
    {
        return $this->apiKey;
    }

    /**
     * Set vendor
     *
     * @param string $vendor
     * @return Game
     */
    public function setVendor($vendor)
    {
        $this->vendor = $vendor;
    
        return $this;
    }

    /**
     * Get vendor
     *
     * @return string 
     */
    public function getVendor()
    {
        return $this->vendor;
    }

    /**
     * Set minPlayer
     *
     * @param integer $minPlayer
     * @return Game
     */
    public function setMinPlayer($minPlayer)
    {
        $this->minPlayer = $minPlayer;
    
        return $this;
    }

    /**
     * Get minPlayer
     *
     * @return integer 
     */
    public function getMinPlayer()
    {
        return $this->minPlayer;
    }

    /**
     * Set maxPlayer
     *
     * @param integer $maxPlayer
     * @return Game
     */
    public function setMaxPlayer($maxPlayer)
    {
        $this->maxPlayer = $maxPlayer;
    
        return $this;
    }

    /**
     * Get maxPlayer
     *
     * @return integer 
     */
    public function getMaxPlayer()
    {
        return $this->maxPlayer;
    }

    /**
     * Set acceptedGamePads
     *
     * @param array $acceptedGamePads
     * @return Game
     */
    public function setAcceptedGamePads($acceptedGamePads)
    {
        $this->acceptedGamePads = $acceptedGamePads;
    
        return $this;
    }

    /**
     * Get acceptedGamePads
     *
     * @return array 
     */
    public function getAcceptedGamePads()
    {
        return $this->acceptedGamePads;
    }
	
    /**
     * Set activated
     *
     * @param boolean $activated
     * @return Game
     */
    public function setActivated($activated)
    {
        $this->activated = $activated;
    
        return $this;
    }

    /**
     * Get activated
     *
     * @return boolean 
     */
    public function getActivated()
    {
        return $this->activated;
    }
	
	/**
     * Set imageName
     *
     * @param $imageName
     * @return Game
     */
    public function setImageName($imageName)
    {
        $this->imageName = $imageName;
    
        return $this;
    }
	
	/**
     * Get imageName
     *
     * @return  
     */
    public function getImageName()
    {
        return $this->imageName;
    }
	
	/**
     * Set image
     *
     * @param $image
     * @return Game
     */
    public function setImage($image)
    {
        $this->image = $image;
    
        return $this;
    }
	
	/**
     * Get image
     *
     * @return  
     */
    public function getImage()
    {
        return $this->image;
    }
	
	/**
	 * @return imagename
	 */
	public function createImageName()
	{
		if (null != $this->image) {
			return "game_".$this->name."_".date('Y-m-d').".png";
		}
	}
	
	
	/**
	 * http://blog.code4hire.com/2011/08/symfony2-sonata-admin-bundle-and-file-uploads/
	 */
	protected function getUploadDir()
	{
	    // get rid of the __DIR__ so it doesn't screw when displaying uploaded doc/image in the view.
		return 'uploads/gameimages';
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
	
	public function upload($basepath)
	{
	    // the file property can be empty if the field is not required
	    if (null === $this->image) {
	        return;
	    }
	   
	    if (null === $basepath) {
	        return;
	    }    
	   
	    // we use the original file name here but you should
		// sanitize it at least to avoid any security issues
		//$someNewFilename = $this->createImageName();
		// set the path property to the filename where you'ved saved the file
		//$this->setImageName($someNewFilename);
		
		// move takes the target directory and then the target filename to move to
		//$this->image->move($this->getUploadRootDir($basepath), $this->image->getClientOriginalName());
		$this->image->move($this->getUploadRootDir($basepath), $this->imageName);
		
		// clean up the file property as you won't need it anymore
	    $this->image = null;
	}
	
	public function removeImage($basepath)
	{
	    if (null === $basepath) {
	        return;
	    }
		
		if (null === $this->imageName) {
	        return;
	    }
	    echo($this->getUploadRootDir($basepath).$this->imageName);
		unlink($this->getUploadRootDir($basepath).$this->imageName);
		
	}
	//------------------------------------------
	
	public function toString()
    {
        return 'Product: id: '.$this->id.
        ' , name: '.$this->name.
        ' , descritpion: '.$this->description;
    }
}