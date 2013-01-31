<?php

namespace MoPad\AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @package MoPad\AdminBundle\Entity
 * @author Janina Trost <janina.trost@student.htw-berlin.de>
 *
 * Game
 * @ORM\Entity
 * @ORM\Table(name="game")
 * @ORM\Entity(repositoryClass="MoPad\AdminBundle\Entity\GameRepository")
 * 
 * @method String createGameJsName()
 * @method String createImageName()
 * @method upload($basepath, $type)
 * @method removeImage($basepath)
 * 
 * * Update Game Entity Getter/Setter
 * - $ php app/console doctrine:generate:entities MoPadAdminBundle
 * * Update database schema/tables
 * - $ php app/console doctrine:schema:update --force
 * Web chache clean
 * - $ php app/console cache:clear
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
	 * @var string
	 * @ORM\Column(type="string", length=255)
	 */
	private $imageUrl = "";
	
	/**
	 * no database safety, local safe
	 */
	private $gameJs;
	
	/**
	 * @var string
	 * @ORM\Column(type="string", length=255)
	 */
	private $gameJsName = "";
	
	/**
	 * @var string
	 * @ORM\Column(type="string", length=255)
	 */
	private $gameJsUrl = "";
	
	
	

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
     * @return File
     */
    public function getImage()
    {
        return $this->image;
    }
	
	/**
     * Set imageName and imageUrl
     *
     * @param $imageName
     * @return Game
     */
    public function setImageName($imageName)
    {
		$this->imageName = urlencode($imageName);
		// set image url
		$this->imageUrl = $this->getGameAdminUrl().$this->getUploadImageDir().'/'.$this->imageName;
    
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
     * Set imageUrl
     *
     * @param $imageUrl
     * @return Game
     */
    public function setImageUrl($imageUrl)
    {
        $this->imageUrl = $imageUrl;
    
        return $this;
    }
	
	/**
     * Get imageUrl
     *
     * @return  
     */
    public function getImageUrl()
    {
        return $this->imageUrl;
    }
	
	/**
     * Set gameJs
     *
     * @param $gameJs
     * @return Game
     */
    public function setGameJs($gameJs)
    {
        $this->gameJs = $gameJs;
    
        return $this;
    }
	
	/**
     * Get gameJs
     *
     * @return  
     */
    public function getGameJs()
    {
        return $this->gameJs;
    }
	
	/**
     * Set gameJsName and gameJsUrl
     *
     * @param $gameJsName
     * @return Game
     */
    public function setGameJsName($gameJsName)
    {
		$this->gameJsName = urlencode($gameJsName);
		// set image url
		$this->gameJsUrl = $this->getGameAdminUrl().$this->getUploadGameJsDir().'/'.$this->gameJsName;
    
        return $this;
    }
	
	/**
     * Get gameJsName
     *
     * @return  
     */
    public function getGameJsName()
    {
        return $this->gameJsName;
    }
	
	/**
     * Set gameJsUrl
     *
     * @param $gameJsUrl
     * @return Game
     */
    public function setGameJsUrl($gameJsUrl)
    {
        $this->gameJsUrl = $gameJsUrl;
    
        return $this;
    }
	
	/**
     * Get gameJsUrl
     *
     * @return  
     */
    public function getGameJsUrl()
    {
        return $this->gameJsUrl;
    }
	
	/**
	 * return the MoPad URL
	 *
	 * @return url
	 */
	private function getGameAdminUrl()
    {
        return 'http://asdfmopad-symfony.de/';
    }
	
	/**
	 * return the upload file path for image
	 *
	 * @return upload path
	 */
	private function getUploadImageDir()
    {
        return 'uploads/gameimage';
    }
	
	/**
	 * return the upload file path for game js
	 *
	 * @return upload path
	 */
	private function getUploadGameJsDir()
    {
        return 'uploads/gamejs';
    }
	
	/**
	 * create a independent file name consisting of a prefix 'image', 
	 * the game name and the date
	 *
	 * @return imageName
	 */
	public function createImageName()
	{
		if (null != $this->image) {
			return "image_".$this->name."_".date('Y-m-d').".png";
		}
	}
	
	/**
	 * create a independent file name consisting of a prefix 'gamejs', 
	 * the game name and the date
	 *
	 * @return gameJsName
	 */
	public function createGameJsName()
	{
		if (null != $this->gameJs) {
			return "gamejs_".$this->name."_".date('Y-m-d').".js";
		}
	}

	/**
	 * upload the file
	 * 
	 * @param base path
	 * @param type (image or gamejs)
	 */
	public function upload($basepath, $type)
	{
		$fuh = new FileUploadHelper();
		
		if ($type == 'image') {
			$fuh->upload($basepath, $this->getUploadImageDir(), $this->image, $this->imageName);
			$this->image = null;
		} else if ($type == 'gamejs') {
			$fuh->upload($basepath, $this->getUploadGameJsDir(), $this->gameJs, $this->gameJsName);
			$this->gameJs = null;
		}
	}
	
	/**
	 * remove the image file
	 * 
	 * @param String basepath
	 */
	public function removeImage($basepath)
	{
		$fuh = new FileUploadHelper();
		$fuh->removeFile($basepath, $this->getUploadImageDir(), $this->imageName);
	}
	
	/**
	 * remove the game js file
	 * 
	 * @param String basepath
	 */
	public function removeGameJs($basepath)
	{
		$fuh = new FileUploadHelper();
		$fuh->removeFile($basepath, $this->getUploadGameJsDir(), $this->gameJsName);
	}
	
	/**
	 * @return string representative
	 */
	public function toString()
    {
        return 'Product: id: '.$this->id.
        ' , name: '.$this->name.
        ' , descritpion: '.$this->description;
    }
}